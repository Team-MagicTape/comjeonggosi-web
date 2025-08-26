const Survey = () => {
  return (
    <div className="fixed top-0 w-full flex justify-center xl:px-13 z-20">
      <div className="w-full h-7 xl:h-10 bg-[#ff8f63] text-white flex items-center px-2 xl:px-8 justify-center gap-3 text-xs xl:text-base">
        <span className="font-semibold">더 나는 서비스를 위해 의견을 들려주세요!</span>
        <a
          href="https://naver.me/GypNVc3Y"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:opacity-80"
        >
          설문조사 링크 바로 가기
        </a>
      </div>
    </div>
  );
};

export default Survey;
