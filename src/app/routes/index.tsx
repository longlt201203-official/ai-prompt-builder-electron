import { NATIVE_API_SAY_HI } from "@/native/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  nativeAPI.invokeNativeAPI(NATIVE_API_SAY_HI, "Long");

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
