package app

import (
	"fmt"
	"tcu/src/database"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) CreateNewCategory(title string) string {
	db := database.GetDatabase()
	if db == nil {
		return "NO_DATABASE"
	}

	var category database.Category
	db.Where("title = ?", title).First(&category)

	if category.ID != 0 {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Category already exists",
		})
		return "CATEGORY_EXISTS"
	}

	newCategory := database.Category{Title: title}

	result := db.Create(&newCategory)
	if result == nil {
		return "ERROR_CREATING"
	}

	return fmt.Sprint(newCategory.ID)
}

func (a *App) LoadCategories(count int, skip int) ([]database.Category, error) {
	db := database.GetDatabase()
	if db == nil {

		return nil, fmt.Errorf("NO_DATABASE")
	}

	var categories []database.Category
	db.Limit(10).Offset(skip).Find(&categories)
	//Return categories to client side here
	return categories, nil
}

func (a *App) EraseCategory(id int) string {
	db := database.GetDatabase()
	if db == nil {

		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Couldnt connect to database",
		})
		return "NO_DATABASE"
	}

	var category database.Category
	db.First(&category, id)
	if category.ID == 0 {

		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Category doesn't exist",
		})
		return "NO_CATEGORY"
	}

	db.Delete(&category)

	if db.Error != nil {

		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Error Deleting Category",
		})
		return "ERROR_DELETING"
	}

	return "OK"
}
