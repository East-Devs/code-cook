export const Header = ({ headerText, label }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-y-4">
      <h1 className="text-3xl font-semibold">{headerText}</h1>

      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
