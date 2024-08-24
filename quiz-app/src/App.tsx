import { useEffect, useState } from "react";
import "./App.scss";
import parse from "html-react-parser";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function App() {
  const [answer, setAnswer] = useState<any>([]);
  const [quizData, setQuizData] = useState<any>([]);
  const [category, setCategory] = useState<any>({});
  const [reqData, setReqData] = useState({ category: null });

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((res) => setCategory(res));
  }, []);

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=2&category=${reqData?.category}&difficulty=medium`
    )
      .then((res) => res.json())
      .then((res) => {
        const results = res.results?.map((element: any) => {
          const { incorrect_answers, correct_answer } = element;
          const shuffled = [...incorrect_answers, correct_answer]
            .map((ele: string) => ({ ele, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ ele }: any) => ({
              value: ele,
              isDisabled: ele !== correct_answer,
            }));
          return { ...element, shuffled };
        });
        setQuizData(results);
      });
  }, [reqData]);

  const handleChangeCategory = (event: any) => {
    const value = event.target.value;
    setAnswer([]);
    setReqData({ category: value });
  };
  console.log({ quizData }, answer);

  const handleAnswer = ({ selectedValue, correct, mainIndex }: any) => {
    const temp = [...answer];
    if (selectedValue === correct) {
      temp[mainIndex] = { isCorrect: true, selectedValue };
    } else {
      temp[mainIndex] = { isCorrect: false, selectedValue };
    }
    setAnswer(temp);
  };

  const totalCorrect = answer.filter((ele: any) => ele.isCorrect)?.length;

  return (
    <div className="main">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={reqData.category}
          label="Age"
          onChange={handleChangeCategory}
        >
          {category?.trivia_categories?.map((cat: any, catInd: number) => {
            return (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br />
      <br />
      <div>
        <p>Total Correct Answer: {totalCorrect}</p>
      </div>
      {quizData?.map((element: any, index: number) => {
        const { shuffled, correct_answer } = element;
        return (
          <Card sx={{ maxWidth: 450 }} key={index}>
            <CardHeader title={parse(element?.question)} />
            <CardBody
              {...{ shuffled, correct_answer, handleAnswer, index, answer }}
            />
          </Card>
        );
      })}
    </div>
  );
}

const CardBody = ({
  shuffled,
  correct_answer,
  handleAnswer,
  index,
  answer,
}: any) => {
  return (
    <CardContent>
      {answer?.[index] && (
        <>
          <p>Is Correct: {answer?.[index]?.isCorrect ? "Yes" : "No"}</p>
          <p>Selected Value: {answer?.[index]?.selectedValue}</p>
        </>
      )}
      {shuffled?.map((ele: any) => (
        <Button
          key={ele}
          disabled={answer?.[index]?.selectedValue}
          color={
            answer?.[index]?.selectedValue === correct_answer
              ? "success"
              : "warning"
          }
          variant="contained"
          onClick={() =>
            handleAnswer({
              selectedValue: ele.value,
              correct: correct_answer,
              mainIndex: index,
            })
          }
        >
          {parse(ele.value)}
        </Button>
      ))}
    </CardContent>
  );
};

export default App;
