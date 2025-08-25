import MailApplyForm from "@/features/mail-apply/ui/MailApplyForm";
import { getSubscription } from "@/features/mail-apply/api/get-subscription";
import { fetchCategories } from "@/entities/category/api/fetch-categories";

const MailApply = async () => {
  const subscription = await getSubscription();
  const categories = await fetchCategories();

  console.log(subscription);

  if(!subscription) {
    return null;
  }

  return (
    <div>
      <MailApplyForm
        initialData={subscription}
        categories={categories}
      />
    </div>
  );
};

export default MailApply;
