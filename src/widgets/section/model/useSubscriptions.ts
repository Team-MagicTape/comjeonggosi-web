import { useCustomRouter } from "@/shared/model/useCustomRouter";

const useSubscriptions = () => {
  const route = useCustomRouter();
  const goToSub = () => {
    route.push("/subscriptions");
  };
  return goToSub;
};

export default useSubscriptions;
