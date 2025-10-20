import NoticesList from "@/entities/notices/ui/NoticeList";
import { fetchInitialNotices } from "@/entities/notices/api/fetch-initial-notices";

const Notice = async () => {
    const notices = await fetchInitialNotices();
    return (
        <div>
            <NoticesList notices={notices} />
        </div>
    );
};

export default Notice;