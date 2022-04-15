import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../../Common/Button";
import { ButtonsWrap } from "../../Utils/ButtonsWrap";
import { Input } from "../../Utils/Input";
import { Toggle } from "./Toggle";
import iconDate from "../../../images/icons/date.svg";
import {
  addTransaction,
  fetchTransactions,
} from "../../../redux/operations/financeOperations";
import { api } from "../../../api/api";
import { DropDown } from "../../Common/DropDown";
import { toast } from "react-toastify";
import { size } from "../../../utils/stylesVars";
import * as Selector from "../../../redux/selectors/financeSelectors"

const InputWrap = styled.div`
  ${size.M} {
    display: flex;
    align-items: center;
    gap: 30px;
  }
`;

const CalendarWrap = styled.div`
  position: relative;
`;

const DateIcon = styled.img`
  pointer-events: none;
  position: absolute;
  top: 3px;
  right: 5px;
  background-color: #fff;
  /* cursor: pointer; */
`;

const defaultValueSelected = "Выберите категорию";

let localDate = new Date().toLocaleDateString();

export const AddTransaction = ({ modalIsOpen, closeModal }) => {
  const [selectedCategory, setSelectedCategory] =
    useState(defaultValueSelected);
  const [toggle, setToggle] = useState(true);
  const [categories, setCategories] = useState([]);
  const [optionsIncome, setOptionsIncome] = useState([]);
  const [optionsExpense, setOptionsExpense] = useState([]);

  const reset = () => {
    setSelectedCategory(defaultValueSelected);
    const refCheckBox = document.getElementById("toggleTypeTransaction");
    if (refCheckBox.checked) {
      refCheckBox.click();
      setToggle(true);
    }
  };

  const dispatch = useDispatch();

  const loading = useSelector(Selector.getFinanceLoading);
  const hasError = useSelector(Selector.getFinanceHasError);

  const onChangeToggle = () => {
    setToggle(!toggle);
    setSelectedCategory(defaultValueSelected);
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await api.categories.getCategories();

      data.forEach((item) =>
        item.isExpense
          ? setOptionsExpense((prev) => [...prev, item])
          : setOptionsIncome((prev) => [...prev, item])
      );

      setCategories([...data]);
    };

    if (categories.length === 0) getCategories();
  }, [modalIsOpen]);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required(() => notify("Введите сумму"))
      .min(0.01, () => notify("Сумма должна быть больше 0")),
    comment: Yup.string().max(20, () => notify("Максимальная длина комментария 20 символов")),
    // date: Yup.date()
    //   .required(() => notify("Выберите дату"))
    //   .max(localDate, () => notify("Выбранная дата ещё не наступила")),
  });

  const notify = (text) => {
    toast.warn(text, {
      toastId: text,
    });
  };

  return (
    <>
      <Toggle active={toggle} onChange={onChangeToggle} />
      <DropDown
        options={toggle ? optionsExpense : optionsIncome}
        selectedOption={selectedCategory}
        setSelectedOption={setSelectedCategory}
        placeholder="Выберите категорию"
        underline
        mWrap="0 0 40px 0"
        p="14px 14px 8px 14px"
        fs="18px"
        lh="26px"
        iconPosTop="60%"
      />
      <Formik
        initialValues={{ amount: "", comment: "", date: localDate }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => {
          if (values.amount > 0)
          if (selectedCategory !== defaultValueSelected) {
            const newTransaction = {
              amount: values.amount,
              comment: values.comment,
              category: selectedCategory._id,
              isExpense: selectedCategory.isExpense,
            };
            
            async function AddTtansaction() {
              try {
                const resAdd = await dispatch(addTransaction(newTransaction));
                await dispatch(fetchTransactions());
                if (resAdd.payload?.response?.status === 400) throw new Error(resAdd.payload.response.data.message);
                if (!loading && !hasError) {
                  resetForm();
                  reset();
                  closeModal();
                }
              } catch (e) {
                (e.message === "Insufficient funds") 
                ? toast.error("Не хватает средств", { toastId: "Insufficient funds" })
                : toast.error("Ошибка на сервере", { toastId: "Error on server" })
              } 
            }
            AddTtansaction();

          } else toast.warn("Выберите категорию", { toastId: "Select category" });
        }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleBlur, handleSubmit, handleReset }) => (
          <>
            <InputWrap>
              <Input
                type="number"
                name="amount"
                placeholder="0.00"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                mb="40px"
                minV="0.01"
                step="10"
                p="8px 8px 8px 16px"
                fs="18px"
                lh="26px"
              />
              <CalendarWrap>
                <Input
                  type="text"
                  name="date"
                  value={values.date}
                  onChange={() => null}
                  onBlur={handleBlur}
                  mb="40px"
                  p="8px 8px 8px 16px"
                  fs="18px"
                  lh="26px"
                  readonly
                />
                <DateIcon src={iconDate} />
              </CalendarWrap>
            </InputWrap>

            <Input
              type="text"
              name="comment"
              placeholder="Комментарий"
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              mb="40px"
              p="8px 8px 8px 16px"
              fs="18px"
              lh="26px"
            />

            <ButtonsWrap>
              <Button
                type="submit"
                accent
                w="100%"
                mw="300px"
                h="50px"
                m="0 0 20px 0"
                p="0"
                onClick={handleSubmit}
                isLoading={loading}
              >
                ДОБАВИТЬ
              </Button>
              <Button
                w="100%"
                mw="300px"
                h="50px"
                onClick={() => {
                  reset();
                  handleReset();
                  closeModal();
                }}
              >
                ОТМЕНА
              </Button>
            </ButtonsWrap>
          </>
        )}
      </Formik>
    </>
  );
};
