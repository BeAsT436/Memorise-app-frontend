export const LanguageSwitcher = () => {
  const languages = [{ key: "en", lable: "EN" }, {key:"ua",lable:"UA"}];
  return (
    <>
      <div>{languages.map((btn)=>{btn})}  </div>
    </>
  );
};
