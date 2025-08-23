import Spacer from "@/shared/ui/Spacer";
import Toggle from "@/shared/ui/Toggle";
import { Settings } from "../types/settings";

interface Props {
  settings: Settings;
  handleSettingChange: (key: keyof Settings) => void;
}

const QuizSettings = ({ settings, handleSettingChange }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg space-y-4 my-5">
      <div className="space-y-2">
        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            checked={settings.hide7Days}
            onChange={() => handleSettingChange("hide7Days")}
            className="w-4 h-4 sm:w-5 sm:h-5 text-primary rounded outline-none"
          />
          <span className="text-sm sm:text-base text-gray-700 font-medium">
            7일간 보지 않기
          </span>
        </label>

        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            checked={settings.hideForever}
            onChange={() => handleSettingChange("hideForever")}
            className="w-4 h-4 sm:w-5 sm:h-5 text-primary rounded outline-none"
          />
          <span className="text-sm sm:text-base text-gray-700 font-medium">
            영원히 보지 않기
          </span>
        </label>

        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            checked={settings.autoNext}
            onChange={() => handleSettingChange("autoNext")}
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded outline-none"
          />
          <span className="text-sm sm:text-base text-gray-700 font-medium">
            자동으로 넘어가기
          </span>
          <Spacer />
          <span>3초 후 넘어가기</span>
          <Toggle on={settings.noDelay} setOn={() => handleSettingChange("noDelay")} />
          <span>즉시 넘어가기</span>
        </label>
      </div>
    </div>
  );
};

export default QuizSettings;
