import Toggle from "@/shared/ui/Toggle";
import { Settings } from "../types/settings";

interface Props {
  settings: Settings;
  handleSettingChange: (key: keyof Settings) => void;
}

const QuizSettings = ({ settings, handleSettingChange }: Props) => {
  return (
    <div className="flex xl:items-center flex-col xl:flex-row gap-1 xl:gap-6 text-sm px-4 sm:px-8 pb-4 mt-2">
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.hideSolved}
          onChange={() => handleSettingChange("hideSolved")}
          className="w-4 h-4"
        />
        <span>푼 문제 다시 보지 않기</span>
      </label>

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.autoNext}
          onChange={() => handleSettingChange("autoNext")}
          className="w-4 h-4"
        />
        <span>자동으로 넘어가기</span>
      </label>

      {settings.autoNext && (
        <div className="flex items-center gap-2 text-xs">
          <span>3초 후</span>
          <Toggle
            on={settings.noDelay}
            setOn={() => handleSettingChange("noDelay")}
          />
          <span>즉시</span>
        </div>
      )}
    </div>
  );
};

export default QuizSettings;