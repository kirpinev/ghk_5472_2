import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";
import offlineImg from "./assets/offline.png";
import gos from "./assets/gos.png";

import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { Gap } from "@alfalab/core-components/gap";
import { BottomSheet } from "@alfalab/core-components/bottom-sheet";
import { useState } from "react";
import { ClockLineMIcon } from "@alfalab/icons-glyph/ClockLineMIcon";
import { BanknotesLineMIcon } from "@alfalab/icons-glyph/BanknotesLineMIcon";
import { ThxLayout } from "./thx/ThxLayout.tsx";
import { sendDataToGA } from "./utils/events.ts";

interface Product {
  title: string;
  text: string;
  price: string;
  type: string;
}

const offline: Product[] = [
  {
    title: "Единовременное пособие при рождении ребенка для работающих",
    price: "от 103 285 ₽",
    type: "Оффлайн",
    text: "Один из работающих родителей ребенка",
  },
  {
    title: "Пособие по беременности и родам для работающих",
    price: "от 10 103 ₽",
    type: "Оффлайн",
    text: "Женщины в декретном отпуске или усыновившие ребёнка возрастом до 3 месяцев",
  },
  {
    title:
      "Ежемесячное пособие по уходу за ребёнком до 1,5 лет для работающих граждан",
    price: "от 10 103 ₽",
    type: "Оффлайн",
    text: "Человек в отпуске по уходу за ребёнком до 1,5 лет — это может быть мать, отец, другой родственник или опекун",
  },
];

const online: Product[] = [
  {
    title: "Единовременная выплата беременной жене военнослужащего по призыву",
    text: "Женщина со сроком беременности не меньше 180 дней, если её муж служит в армии или учится на первом курсе военного училища или военной кафедры",
    price: "42 665 ₽",
    type: "Онлайн",
  },
  {
    title: "Ежемесячная выплата из материнского капитала на ребенка до 3 лет",
    price: "от 14 276 ₽",
    type: "Онлайн",
    text:
      "Семьи граждан Российской Федерации с детьми не старше 3 лет и с сертификатом на материнский капитал\n" +
      "Размер среднедушевого дохода семьи не превышает двукратную величину прожиточного минимума на душу населения, установленную в регионе проживания семьи.",
  },
  {
    title: "Ежемесячное пособие на ребенка военнослужащего по призыву",
    price: "от 18 285 ₽",
    type: "Онлайн",
    text: "Мать, опекун или другой родственник ребёнка, отец которого служит в армии, либо учится на 1 курсе военной образовательной огранизации",
  },
  {
    title: "Единого пособия для семей с детьми и беременных женщин",
    price: "от 7 138 ₽",
    type: "Онлайн",
    text: "Беременные женщины, вставшие на учёт до 12 недель беременности, и малообеспеченные семьи с детьми в возрасте от 0 до 17 лет",
  },
  {
    title: "Единовременная выплата остатка маткапитала",
    price: "до 10 000 ₽",
    type: "Онлайн",
    text: "Семьи, у которых на сертификате материнского капитала осталось от 10 000 рублей и меньше",
  },
  {
    title: "Единовременное пособие при передаче ребенка на воспитание в семью",
    price: "от 26 942 ₽",
    type: "Онлайн",
    text: "Усыновитель, опекун, попечитель, или приемный родитель ребёнка",
  },

  {
    title: "Единовременное пособие при рождении ребенка для неработающих",
    price: "26 942 ₽",
    type: "Онлайн",
    text:
      "Неработающий родитель ребенка, его опекун или усыновитель.\n" +
      "Пособие назначается, если оба родителя ребенка (лица их заменяющие) не работают\n" +
      "\n",
  },
  {
    title:
      "Ежемесячное пособие по уходу за ребёнком до 1,5 лет для неработающих граждан",
    price: "26 942 ₽",
    type: "Онлайн",
    text: "Неработающий родитель, опекун, усыновитель или другой родственник, который ухаживает за ребёнком до 1,5 лет при выполнении ряда существенных условий",
  },
];

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [thxShow, setThxShow] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const submit = () => {
    setIsLoading(true);
    sendDataToGA({ type: selectedProduct?.title as string }).then(() => {
      setIsLoading(false);
      LS.setItem(LSKeys.ShowThx, true);
      setThxShow(true);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div
          style={{
            padding: "2rem 1rem 1rem 1rem",
            backgroundColor: "#2637580F",
          }}
        >
          <Typography.TitleResponsive tag="h1" view="medium" font="system">
            Детские пособия
          </Typography.TitleResponsive>
        </div>

        <div className={appSt.products}>
          <Gap size={4} />
          <Typography.Text
            view="primary-large"
            weight="medium"
            tag="p"
            defaultMargins={false}
            style={{ fontSize: "20px" }}
          >
            Выберите подходящую выплату
          </Typography.Text>

          <Gap size={4} />

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img src={gos} alt="" width={32} height={32} />
            <Typography.Text
              view="primary-large"
              weight="medium"
              tag="p"
              defaultMargins={false}
            >
              Онлайн через Госуслуги
            </Typography.Text>
          </div>

          {online.map((product) => (
            <div
              className={appSt.product}
              key={product.title}
              onClick={() => {
                setSelectedProduct(product);
                setIsOpen(true);
              }}
            >
              <div>
                <Typography.Text
                  view="primary-medium"
                  weight="medium"
                  tag="p"
                  defaultMargins={false}
                >
                  {product.title}
                </Typography.Text>
                <Gap size={8} />
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <BanknotesLineMIcon color="grey" />
                  <Typography.Text
                    view="primary-small"
                    tag="p"
                    defaultMargins={false}
                  >
                    {product.price}
                  </Typography.Text>
                </div>
              </div>
            </div>
          ))}

          <Gap size={4} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <img src={offlineImg} alt="" width={32} height={32} />
              <Typography.Text
                view="primary-large"
                weight="medium"
                tag="p"
                defaultMargins={false}
              >
                Офлайн через ведомство
              </Typography.Text>
            </div>
            <Gap size={8} />
            <Typography.Text
              view="primary-medium"
              color="secondary"
              tag="p"
              defaultMargins={false}
            >
              Нужно предоставить документы <br /> в соответствующее ведомство
            </Typography.Text>
          </div>

          {offline.map((product) => (
            <div
              className={appSt.product}
              key={product.title}
              onClick={() => {
                setSelectedProduct(product);
                setIsOpen(true);
              }}
            >
              <div>
                <Typography.Text
                  view="primary-medium"
                  weight="medium"
                  tag="p"
                  defaultMargins={false}
                >
                  {product.title}
                </Typography.Text>
                <Gap size={8} />
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <BanknotesLineMIcon color="grey" />
                  <Typography.Text
                    view="primary-small"
                    tag="p"
                    defaultMargins={false}
                  >
                    {product.price}
                  </Typography.Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomSheet open={isOpen} onClose={() => setIsOpen(false)}>
        <Typography.Text
          view="primary-large"
          weight="bold"
          tag="p"
          defaultMargins={false}
          style={{ textAlign: "center" }}
        >
          {selectedProduct?.title}
        </Typography.Text>
        <Gap size={24} />
        <Typography.Text
          view="primary-medium"
          weight="bold"
          tag="p"
          defaultMargins={false}
        >
          Кто может получить
        </Typography.Text>
        <Gap size={8} />
        <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
          {selectedProduct?.text}
        </Typography.Text>
        <Gap size={16} />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <BanknotesLineMIcon color="grey" />
            <Typography.Text
              view="primary-medium"
              tag="p"
              defaultMargins={false}
            >
              {selectedProduct?.price}
            </Typography.Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ClockLineMIcon color="grey" />
            <Typography.Text
              view="primary-medium"
              tag="p"
              defaultMargins={false}
            >
              {selectedProduct?.type}
            </Typography.Text>
          </div>
        </div>
        <Gap size={24} />
        <ButtonMobile block loading={isLoading} view="primary" onClick={submit}>
          Оформить
        </ButtonMobile>
      </BottomSheet>
    </>
  );
};
