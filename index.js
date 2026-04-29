import  { thresholdMasses }  from "./thresholdMasses.js";
const riskAssessmentList = document.querySelector(".riskAssessmentList")
import { riskAssessmentCriteria } from "./riskAssessmentCriteria.js";
const submitFirstForm = document.querySelector(".submitFirstForm");
const selectDangerousSubstance = document.querySelector(".selectDangerousSubstance");
const title = document.querySelector(".title");
const calculationForm = document.querySelector(".calculationForm");
const amountSubstance = document.querySelector(".amount");
const main = document.querySelector(".main")
const mainIdentification = document.querySelector(".mainIdentification")
const mainRiskAssessment = document.querySelector(".mainRiskAssessment")

selectDangerousSubstance.addEventListener("change", setOutputSubstance);
submitFirstForm.addEventListener("click", submit);
amountSubstance.addEventListener("change", submitAmount)
// console.log("prikol", riskAssessmentCriteria)

//__________________________________________________ІДЕНТИФІКАЦІЯ ОБ'ЄКТА_______________________________________

const name = thresholdMasses.map(function(word) {

  const option = document.createElement("option")
  option.value = `${word.individualNamesOfDangerousSubstances}`
  option.textContent = `${word.individualNamesOfDangerousSubstances}`
  // option.classList = 
  selectDangerousSubstance.append(option)
  // console.log('word',word.individualNamesOfDangerousSubstances );
})





let obj = {
  amount:0,
  substance: 0,
  counter: 0,
  classForOne: "",
  risk: "", 
  };
  let array = [];
  function submitAmount(event){
    const selectAmount = event.target.value;
    obj.amount = selectAmount;
  }
function setOutputSubstance(event) {
    const selectSubstance = event.target.value;
    obj.substance = selectSubstance;
  }


  function submit() {
    const { substance, amount } = obj;
  
  
    if (substance.length > 1 && amount >=0) {

      const objWhichSubstances =  thresholdMasses.find(option => option.individualNamesOfDangerousSubstances === obj.substance)
      const information = objWhichSubstances.informtext
      obj.information = "information"
      const thresholdMassesForOne = objWhichSubstances.thresholdMassNorm
 if (Number(amount) < Number(thresholdMassesForOne.thirdClass)){
  obj.classForOne = "Не відноситься до об’єктів підвищеної небезпеки"
  console.log("Не відноситься до об’єктів підвищеної небезпеки")
 }  else if(Number(thresholdMassesForOne.thirdClass) <= Number(amount)&& Number(amount) < Number(thresholdMassesForOne.secondClass)){ 
  obj.classForOne = "3 клас";

  console.log("3 клас")

 } else if(Number(thresholdMassesForOne.secondClass) <= Number(amount) && Number(amount) < Number(thresholdMassesForOne.firstClass)){ 
 obj.classForOne = "2 клас";
 console.log("2 клас")

 }else if( Number(amount) >= Number(thresholdMassesForOne.firstClass)){ 
 obj.classForOne = "1 клас";
 console.log("1 клас")

 }
 else{
  console.log("Помилка, зверніться будь ласка до адміністратора")
 }

 array.push({ ...obj });








      title.innerHTML = " Небезпечні речовини для розрахунку";
      title.classList = "titlesSubstance";
  
      const item = document.createElement("li");
      const ul = document.createElement("ul");
      ul.classList = "substanceWhoAdd cont";
      const substance1 = document.createElement("li");
      substance1.classList = "substanceWhoAddItem";
      substance1.style.color = "bold"
      substance1.textContent = `Небезпечна речовина: ${substance}`;

      const amount1 = document.createElement("li");
      amount1.classList = "amountWhoAddItem";
      amount1.textContent = `Кількість речовини: ${amount} т`;

      const inform2 = document.createElement("li")
      inform2.classList = "amountWhoAddItem";
      inform2.textContent = `Додаткова інформація: ${information} `;
      ul.append(substance1, amount1, inform2);

      item.append(ul);
 
      // Створення кнопки для розрахунків
      const submitFinalForm = document.createElement("button");
      submitFinalForm.textContent = "Розрахувати";
      submitFinalForm.type = "button";
      submitFinalForm.style = "padding: 20px";
      submitFinalForm.classList = "submitFinaltForm btn";
      submitFinalForm.addEventListener("click", disabledFinalFormButton);
      function disabledFinalFormButton() {
        submitFinalForm.disabled = true;
      }

      calculationForm.append(item);

      if (obj.counter !== 1) {
        // secondForm.append(title)
        calculationForm.after(submitFinalForm);
      }
   


      const submitFinaltForm2 = document.querySelector(".submitFinaltForm");
      submitFinaltForm2.addEventListener("click", heightOfCollapse);
  
      //Скидаємо данні форми та очищаємо обєкт
      selectDangerousSubstance.selectedIndex = 0;
      amountSubstance.value =""
      obj.substance = 0;
      obj.amount = 0;
      obj.counter = 1;
    } else {
      alert("Будь ласка заповніть всі поля");
    }
  }



//Функція для фінального розрахунку
function heightOfCollapse (){

   

    //Перебираю класи об'єкта
  const allClassesForOne = array.map((arr) => arr.classForOne);
  let cherry = ""
  const first = allClassesForOne.includes("1 клас")
  if(first === true){
    cherry = "належить до 1 класу небезпечних речовин"
    // console.log("1111", first)
  } else if(first === false){
const second = allClassesForOne.includes("2 клас")
if(second === true){
   cherry = "належить до 2 класу небезпечних речовин"
} else if(second === false){
  const third = allClassesForOne.includes("3 клас")
  if(third ===true){
     cherry = "належить до 3 класу небезпечних речовин"
  } else if(third === false){
    cherry = "не відноситься до об’єктів підвищеної небезпеки"
  }
}
  }
  const finalFirstContainer = document.createElement("div")
  finalFirstContainer.classList = "container"
  const firstTitle = document.createElement("p")
  firstTitle.textContent = `Об'єкт  ${cherry}`
  firstTitle.classList = "firstResult substanceWhoAdd calculationForm cont"

   

// кнопка переходу від першого кроку до наступного
const firstStepEnd = document.createElement("button")
      firstStepEnd.textContent = "Провести нові розрахунки";
      firstStepEnd.type = "button";
      firstStepEnd.style = "padding: 20px"; 
      firstStepEnd.classList = "submitFinaltForm btn";
      firstStepEnd.addEventListener("click", firstStepEndButton);
      function firstStepEndButton() {
       location.reload()
      }


  finalFirstContainer.append(firstTitle)
  finalFirstContainer.append(firstStepEnd)
  
  mainIdentification.append(finalFirstContainer)
console.log("cherry", cherry)

    submitFirstForm.disabled = true;
}







    







  



 










