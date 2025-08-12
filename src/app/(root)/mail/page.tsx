import MailApplyForm from "@/features/mail-apply/ui/MailApplyFormClient";
import { getSubscription } from "@/features/mail-apply/api/get-subscription";

const MailApply = async () => {
  const subscription = await getSubscription();
  return (
    <div>
      <MailApplyForm
        initialHour={subscription.hour}
        initialMinute={subscription.minute}
      />
    </div>
  );
};

export default MailApply;
