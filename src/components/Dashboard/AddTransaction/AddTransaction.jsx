import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "../../Common/Button";
import { ButtonsWrap } from "../../Utils/ButtonsWrap";
import { Input } from "../../Utils/Input";
import { Toggle } from "./Toggle";
import iconDate from "../../../images/icons/date.svg";
import { addTransaction } from "../../../redux/operations/financeOperations";
import { api } from "../../../api/api";
import { DropDown } from "../../Common/DropDown";
import { toast } from "react-toastify";
import { size } from "../../../utils/stylesVars";

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
// const optionsIncome = [];
// const optionsExpense = [];

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

  const notify = (text) => {
    toast.warn(text, {
      toastId: "252",
    });
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required(() => toast.warn("Введите сумму", { toastId: "Sum" }))
      .min(0.01, () =>
        toast.warn("Сумма должна быть больше 0", { toastId: ">0" })
      ),
    comment: Yup.string().max(20, () =>
      toast.warn("Максимальная длина комментария 20 символов", {
        toastId: "<20",
      })
    ),
    // date: Yup.date()
    //   .required(() => toast.warn("Выберите дату", { toastId: "select date" }))
    //   .max(localDate, () => toast.warn("Выбранная дата ещё не наступила", { toastId: "future" })),
  });

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
      />
      <Formik
        initialValues={{ amount: "", comment: "", date: localDate }}
        validateOnChange
        onSubmit={(values, { resetForm }) => {
          if (selectedCategory !== defaultValueSelected) {
            const newTransaction = {
              amount: values.amount,
              comment: values.comment,
              category: selectedCategory._id,
              isExpense: selectedCategory.isExpense,
            };
            dispatch(addTransaction(newTransaction));
            // console.log(newTransaction);
            resetForm();
            reset();
            closeModal();
          } else notify("Выберите категорию");
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          handleReset,
          dirty,
        }) => (
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
              />
              <CalendarWrap>
                <Input
                  type="text"
                  name="date"
                  value={values.date}
                  onChange={() => null}
                  onBlur={handleBlur}
                  mb="40px"
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
