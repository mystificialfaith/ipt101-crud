let students = [];
let editIndex = null;

document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let lastName = document.getElementById("lastName").value.trim();
    let firstName = document.getElementById("firstName").value.trim();
    let middleName = document.getElementById("middleName").value.trim();
    let birthdate = document.getElementById("birthdate").value;
    let course = document.getElementById("course").value;
    let yearLevel = document.getElementById("yearLevel").value;

    if (!lastName || !firstName || !birthdate || !course || !yearLevel) {
        alert("Please fill in all required fields.");
        return;
    }

    if (editIndex === null) {
        students.push({
            id: Date.now(),
            lastName,
            firstName,
            middleName,
            birthdate,
            course,
            yearLevel
        });
    } else {
        students[editIndex] = {
            ...students[editIndex],
            lastName,
            firstName,
            middleName,
            birthdate,
            course,
            yearLevel
        };
        editIndex = null;
        document.getElementById("btn").textContent = "Add Student";
    }

    this.reset();
    displayStudents();
});

function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.lastName}</td>
            <td>${student.firstName}</td>
            <td>${student.middleName || "-"}</td>
            <td>${student.birthdate}</td>
            <td>${student.course}</td>
            <td>${student.yearLevel}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function editStudent(index) {
    let s = students[index];
    editIndex = index;

    document.getElementById("lastName").value = s.lastName;
    document.getElementById("firstName").value = s.firstName;
    document.getElementById("middleName").value = s.middleName;
    document.getElementById("birthdate").value = s.birthdate;
    document.getElementById("course").value = s.course;
    document.getElementById("yearLevel").value = s.yearLevel;

    document.getElementById("btn").textContent = "Update Student";
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        displayStudents();
    }
}
