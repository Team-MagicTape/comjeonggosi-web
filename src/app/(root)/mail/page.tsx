import MailApplyForm from "@/features/mail-apply/ui/MailApplyForm";
import { getSubscription } from "@/features/mail-apply/api/get-subscription";

const MailApply = async () => {
  const subscription = await getSubscription();
  return (
    <MailApplyForm
      initialHour={subscription.hour}
      initialMinute={subscription.minute}
    />
  );
};

export default MailApply;
