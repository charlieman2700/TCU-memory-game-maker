package app

import (
	"encoding/json"
	"fmt"
	"tcu/src/database"
)

func (a *App) CreateNewCategory(title string) string {
	db := database.GetDatabase()
	if db == nil {
		return "NO_DATABASE"
	}

	newCategory := database.Category{Title: title}

	result := db.Create(&newCategory)
	if result == nil {
		return "ERROR_CREATING"
	}

	return fmt.Sprint(newCategory.ID)
}

func (a *App) LoadCategories(count int, skip int) string {
	db := database.GetDatabase()
	if db == nil {
		return "NO_DATABASE"
	}

	var categories []database.Category
	db.Limit(10).Offset(skip).Find(&categories)
	//Return categories to client side here
	fmt.Println(categories)

	json, _ := json.Marshal(&categories)
	fmt.Println(string(json))
	return string(json)
	// return "OK"
}

func (a *App) EraseCategory(id int) string {
	db := database.GetDatabase()
	if db == nil {
		return "NO_DATABASE"
	}

	var category database.Category
	db.First(&category, id)
	if category.ID == 0 {
		return "NO_CATEGORY"
	}

	db.Delete(&category)

	if db.Error != nil {
		return "ERROR_DELETING"
	}

	return "OK"
}
