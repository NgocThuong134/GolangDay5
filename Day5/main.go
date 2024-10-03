package main

import (
	"net/http"
	"strconv"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

type Student struct {
	ID      int     `json:"id" gorm:"primaryKey"`
	Name    string  `json:"name"`
	Gender  string  `json:"gender"`
	Email   string  `json:"email"`
	Age     int     `json:"age"`
	Math    float32 `json:"math"`
	English float32 `json:"english"`
}

var db *gorm.DB
var students []Student

func initDB() {
	dsn := "root:passroot@tcp(127.0.0.1:3308)/task_students?parseTime=true&loc=Local"
	var err error
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Student{})
}

func getStudents(c *gin.Context) {
	var students []Student
	db.Find(&students)
	c.JSON(http.StatusOK, students)
}

func getStudentDetail(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var student Student
	if err := db.First(&student, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Student not found"})
		return
	}
	c.JSON(http.StatusOK, student)
}

func addStudent(c *gin.Context) {
	var newStudent Student
	if err := c.ShouldBindJSON(&newStudent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&newStudent)
	c.JSON(http.StatusCreated, newStudent)
}

func updateStudent(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var updatedStudent Student
	if err := c.ShouldBindJSON(&updatedStudent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Model(&Student{}).Where("id = ?", id).Updates(updatedStudent).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Student not found"})
		return
	}
	c.JSON(http.StatusOK, updatedStudent)
}

func deleteStudent(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := db.Delete(&Student{}, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Student not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Student deleted"})
}

func main() {
	initDB()
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/get-students", getStudents)
	r.GET("/get-student-detail/:id", getStudentDetail)
	r.POST("/add-student", addStudent)
	r.PUT("/update-student/:id", updateStudent)
	r.DELETE("/delete-student/:id", deleteStudent)

	r.Run()
}