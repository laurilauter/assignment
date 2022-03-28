document.addEventListener("DOMContentLoaded", () => {
  //an empty array for test
  let tests = [];

  /* ------   add listeners to buttons ------    */
  document
    .getElementById("test-button")
    .addEventListener("click", (response) => {
      response.preventDefault();

      //capture input and checkbox value
      const inserted = document.getElementById("input-word").value;

      //normalize radio buttons to boolean
      const assumption = normalize(
        document.querySelector('input[name="assumption"]:checked').value
      );
      function normalize(assumption) {
        if (assumption === "true") {
          return true;
        } else {
          return false;
        }
      }

      //remove red border from input if there is any
      document.getElementById("input-word").classList.remove("alert");
      document.getElementById("input-word").placeholder = "Type here..";
      document.querySelector("#true").checked = true;
      document.querySelector("#false").checked = false;

      //if there is input proceed with check, otherwise break
      if (inserted) {
        checkPalindrome(inserted, assumption);
      } else {
        //input was empty, highlight border and display a message
        const inputElement = document.getElementById("input-word");
        inputElement.placeholder = "Input required!";
        inputElement.classList.add("alert");
      }
      //clear input
      document.getElementById("input-word").value = "";
    });

  //default tests button pressed
  document
    .getElementById("default-button")
    .addEventListener("click", (response) => {
      response.preventDefault();

      //remove red border from input if there is any
      document.getElementById("input-word").classList.remove("alert");
      document.querySelector("#true").checked = true;
      document.querySelector("#false").checked = false;
      //clear input
      document.getElementById("input-word").value = "";

      defaultTests();
    });

  //default clear button pressed
  document
    .getElementById("clear-button")
    .addEventListener("click", (response) => {
      response.preventDefault();

      //remove red border from input if there is any
      document.getElementById("input-word").classList.remove("alert");
      document.querySelector("#true").checked = true;
      document.querySelector("#false").checked = false;

      //clear table
      let table = document.querySelector("table");
      clearTable(table);

      //clear array
      tests = [];

      //remove red border from input if there is any
      document.getElementById("input-word").classList.remove("alert");
      document.querySelector('input[name="assumption"]:checked');
      //clear input
      document.getElementById("input-word").value = "";
    });

  //check conditions and generate output
  function checkPalindrome(inserted, assumption) {
    //save original input for later
    const rawInserted = inserted;
    //remove special characters and set to lowercase
    inserted = inserted.replace(/[^a-z0-9]*\s, "").toLowerCase();

    //test for palindrome
    function isPalindrome(inserted) {
      //reverse the string
      const reversed = inserted.split("").reverse().join("");
      //compare strings
      if (inserted === reversed) {
        return true;
      } else {
        return false;
      }
    }

    const palindrome = isPalindrome(inserted);

    //compare expected_result vs actual_result
    function compare(palindrome, assumption) {
      if (palindrome === assumption) {
        return true;
      } else {
        return false;
      }
    }

    //create object and push it to result
    function createOutput(palindrome, assumption, rawInserted) {
      const testCase = {
        no: tests.length + 1,
        inputWord: rawInserted,
        verdict: compare(palindrome, assumption),
      };

      //add current testcase to the output array
      tests.push(testCase);
    }

    createOutput(palindrome, assumption, rawInserted);

    drawTable(tests);
  }

  //draw table
  function drawTable(tests) {
    // select table element
    let table = document.querySelector("table");
    //clear table
    clearTable(table);

    //create and populate table elements
    tests.forEach((test) => {
      let row = document.createElement("tr");
      Object.values(test).forEach((text) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
      });

      table.appendChild(row);

      //paint cell green or red
      var cellBoolean = row.getElementsByTagName("td")[2];
      if (cellBoolean.innerHTML == "true") {
        cellBoolean.classList.add("green");
      } else {
        cellBoolean.classList.add("red");
      }
    });
  }

  //clear table
  function clearTable(table) {
    let rowCount = table.rows.length;
    for (let x = rowCount - 1; x > 0; x--) {
      table.deleteRow(x);
    }
  }

  //set of default tests
  function defaultTests() {
    checkPalindrome("anna", true);
    checkPalindrome("Anna", true);
    checkPalindrome("anna ", true);
    checkPalindrome("YellowSubmarine", false);
  }
});
