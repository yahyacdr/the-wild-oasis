import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      toast.success("New cabin successfully created");
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleOnSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errs) {
    console.log(errs);
  }
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
        orientation="horizontal"
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.max_capacity?.message}
        orientation="horizontal"
      >
        <Input
          type="number"
          id="max_capacity"
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regular_price?.message}
        orientation="horizontal"
      >
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        orientation="horizontal"
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (val) =>
              Number(val) <= Number(getValues().regular_price) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
        orientation="horizontal"
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
