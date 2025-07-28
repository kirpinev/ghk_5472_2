import { useTimeout } from "./use-timeout";

export const RedirectTo = () => {
  useTimeout(() => {
    window.location.replace(
      "alfabank://sdui_screen?screenName=InvestmentLongread&fromCurrent=true&endpoint=v1/invest-main-screen-view/investment-longread/50219%3flocation=AM%26campaignCode=GH",
    );
  }, 2000);

  return null;
};
