let myLibrary = []
let addCount = 0

addBookToLibrary(new Book("Example 1", "Author 1", false))
addBookToLibrary(new Book("Example 2", "Author 2", false))
addBookToLibrary(new Book("Example 3", "Author 3", false))
refreshTable()

function Book(title, author, isRead) {
  addCount++
  this.title = title
  this.author = author
  this.bookID = addCount
  this.isRead = isRead
  this.isDelete = false
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function refreshTable() {
  clearAllRows()
  myLibrary.forEach(populateRow)
}

function clearAllRows() {
  for (const row of document.querySelectorAll(".bookDataRow")) {
    row.remove()
  }
}

function populateRow(tempBook) {
  if (tempBook.isDelete == true) {
    return
  }
  newRow = mainTable.insertRow(-1)
  newRow.classList.add("bookDataRow")
  newRow.classList.add("bookID" + tempBook.bookID)

  newTitleCell = newRow.insertCell(0)
  newAuthorCell = newRow.insertCell(1)
  newReadCell = newRow.insertCell(2)

  newTitleCell.innerHTML =
    '<div class="textCell bookID' +
    tempBook.bookID +
    '">' +
    tempBook.title +
    "</div>"
  newAuthorCell.innerHTML =
    '<div class="textCell bookID' +
    tempBook.bookID +
    '">' +
    tempBook.author +
    "</div>"

  newReadCell.classList.add("lastColTd")

  if (tempBook.isRead) {
    newReadCell.innerHTML =
      '<div class="lastColCell"><div class="fullIcon statusIcon tableIcon bookID' +
      tempBook.bookID +
      '"></div><div class="tableIcon deleteIcon bookID' +
      tempBook.bookID +
      '"></div></div>'
  } else {
    newReadCell.innerHTML =
      '<div class="lastColCell"><div class="emptyIcon statusIcon tableIcon bookID' +
      tempBook.bookID +
      '"></div><div class="tableIcon deleteIcon bookID' +
      tempBook.bookID +
      '"></div></div>'
  }
}

function checkInputs() {
  let errorExists = false
  if (titleInput.value.length == 0) {
    titleError.innerHTML = "Title must be filled out"
    errorExists = true
  } else {
    titleError.innerHTML = ""
  }

  if (authorInput.value.length == 0) {
    authorError.innerHTML = "Author name must be filled out"
    errorExists = true
  } else {
    authorError.innerHTML = ""
  }

  if (errorExists == true) {
    thisIsAnErrorToStopDebugger
  }
}

document.addEventListener("click", (e) => {
  console.log(e.target.tagName)

  //for opening and closing new book popup
  if (e.target.id == "addIcon") {
    titleInput.value = ""
    authorInput.value = ""
    readInput.checked = false

    newPopUp.style.display = "block"
    return
  } else if (
    newPopUp.style.display == "block" &&
    newPopUp.contains(e.target) == false
  ) {
    newPopUp.style.display = "none"
    return
  }

  //for chaging status
  if (e.target.classList.contains("statusIcon")) {
    myLibrary.forEach(function (book) {
      if (e.target.classList.contains("bookID" + book.bookID)) {
        if (book.isRead == true) {
          book.isRead = false
        } else {
          book.isRead = true
        }
      }
    })
    refreshTable()
  }

  //cilck delete icon
  if (e.target.classList.contains("deleteIcon")) {
    myLibrary.forEach(function (book) {
      if (e.target.classList.contains("bookID" + book.bookID)) {
        book.isDelete = true
      }
    })
    refreshTable()
  }
})

addBtn.addEventListener("click", (e) => {
  //add book to myLibrary
  checkInputs()
  let newBook = new Book(titleInput.value, authorInput.value, readInput.checked)
  addBookToLibrary(newBook)
  refreshTable()
  newPopUp.style.display = "none"
})
