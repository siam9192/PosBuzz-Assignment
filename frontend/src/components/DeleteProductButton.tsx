import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../api-services/product.api";
import { queryClient } from "../providers/Provider";
import { App } from "antd";

interface Props {
  id: string;
}
function DeleteProductButton({ id }: Props) {
  const { message } = App.useApp();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess(data) {
      message.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(err) {
      message.error(err.message);
    },
  });

  return <a onClick={() => !isPending && mutate(id)}>Delete</a>;
}

export default DeleteProductButton;
