import MailApplyForm from "@/features/mail-apply/ui/MailApplyForm";
import { getSubscription } from "@/features/mail-apply/api/get-subscription";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchUser } from "@/entities/user/api/fetch-user";

const MailApply = async () => {
  const subscription = await getSubscription();
  const categories = await fetchCategories();
  const user = await fetchUser();

  return (
    <div>
      <MailApplyForm
        initialData={subscription}
        categories={categories}
        user={user}
      />
    </div>
  );
};

export default MailApply;
