import { useForm, useFieldArray } from "react-hook-form";

type formTypes = {
  username: string;
  email: string;
  channel: string;
  age: Date;
  memberName: { name: string }[];
};
const Myform = () => {
  const form = useForm<formTypes>({
    defaultValues: {
      memberName: [{ name: "" }],
    },
  });
  const { register, handleSubmit, formState, control, getValues, setValue } =
    form;
  const submitForm = (data: formTypes) => {
    console.log({ data });
  };
  const { fields, append, remove } = useFieldArray({
    name: "memberName",
    control,
  });
  const { errors } = formState;
  const getformValue = () => {
    console.log("form get value", getValues(["username", "age"]));
  };
  const setformValue = () => {
    console.log(
      "form get value",
      setValue("username", "", { shouldValidate: true })
    );
  };
  return (
    <form className="myform" onSubmit={handleSubmit(submitForm)}>
      <div className="form-control">
        <label htmlFor="username">UserName</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Usename is required",
            },
          })}
        />
        <p className="error">{errors?.username?.message}</p>
      </div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
          })}
        />
        <p className="error">{errors?.email?.message}</p>
      </div>
      <div className="form-control">
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel is required" },
          })}
        />
        <p className="error">{errors?.channel?.message}</p>
      </div>
      <div className="form-control">
        <label htmlFor="age">Channel</label>
        <input
          type="date"
          id="age"
          {...register("age", {
            valueAsDate: true,
            required: { value: true, message: "Age is required" },
          })}
        />
        <p className="error">{errors?.channel?.message}</p>
      </div>
      <div>
        {fields.map((field, index) => {
          return (
            <div className="form-control" key={field.id}>
              <input type="text" {...register(`memberName.${index}.name`)} />
              {index > 0 && (
                <button onClick={() => remove(index)}>Remove</button>
              )}
            </div>
          );
        })}
        <button onClick={() => append({ name: "" })}>Add</button>
      </div>
      <button className="button">Submit</button>
      <div>
        <button className="button" onClick={getformValue}>
          Get Value
        </button>
        <button className="button" onClick={setformValue}>
          Set Values
        </button>
      </div>
    </form>
  );
};

export default Myform;
