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

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateIcon = styled.img`
  pointer-events: none;
  position: absolute;
  top: 360px;
  left: 367px;
  background-color: #fff;
  cursor: pointer;
`;

const defaultValueSelected = "Выберите категорию";
const optionsIncome = [];
const optionsExpense = [];

let localDate = new Date().toISOString().split("T")[0];

export const AddTransaction = ({ modalIsOpen, closeModal }) => {
  const [selectedCategory, setSelectedCategory] =
    useState(defaultValueSelected);
  const [toggle, setToggle] = useState(true);
  const [categories, setCategories] = useState([]);

  const reset = () => {
    setSelectedCategory(defaultValueSelected);
    const refCheckBox = document.getElementById("toggleTypeTransaction");
    console.log(refCheckBox);
    if (refCheckBox.checked) {
      refCheckBox.click();
      setToggle(true);
    }
  }

  const cancelTransaction =() => {
    reset();
    closeModal();
  }

  const dispatch = useDispatch();

  const onChangeToggle = () => {
    setToggle(!toggle);
    setSelectedCategory(defaultValueSelected);
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await api.categories.getCategories();
      setCategories([...data]);
    };
    if (categories.length === 0) getCategories();
  }, [modalIsOpen]);

  useEffect(() => {
    if (categories.length !== 0)
      for (let i = 0; i < categories.length; i += 1) {
        categories[i].isExpense
          ? optionsExpense.push(categories[i])
          : optionsIncome.push(categories[i]);
      }
  }, [categories]);

  const notify = (text) => toast.warn(text);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required(() => notify("Введите сумму"))
      .min(0.01, () => notify("Сумма должна быть больше 0")),
    comment: Yup.string().max(500, () =>
      notify("Ваш комментарий слишком велик")
    ),
    date: Yup.date()
      .required(() => notify("Выберите дату"))
      .max(localDate, () => notify("Выбранная дата ещё не наступила")),
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
        m="0 0 40px 0"
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
            <Input
              type="number"
              name="amount"
              placeholder="0.00"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              mb="40px"
            />

            <Input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              mb="40px"
            />

            <DateIcon src={iconDate} />

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
              <Button w="100%" mw="300px" h="50px" onClick={closeModal}>
                ОТМЕНА
              </Button>
            </ButtonsWrap>
          </>
        )}
      </Formik>
    </>
  );
};
