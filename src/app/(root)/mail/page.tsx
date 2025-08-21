import MailApplyForm from "@/features/mail-apply/ui/MailApplyFormClient";
import { getSubscription } from "@/features/mail-apply/api/get-subscription";
import { getCategory } from "@/features/mail-apply/api/category";
export interface SubscribeMail {
  hour?: number;
  minute?: number;
}

const MailApply = async () => {
  const subscription = await getSubscription();
  const categories = await getCategory();

  return (
    <div>
      <MailApplyForm
        initialHour={subscription.hour}
        categories={categories}
      />
    </div>
  );
};

export default MailApply;
