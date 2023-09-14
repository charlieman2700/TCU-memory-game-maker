package app

import (
	"fmt"
	"tcu/src/database"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) CreateNewGame(title string, description string) string {
	db := database.GetDatabase()
	if db == nil {
		return "NO_DATABASE"
	}

	var game database.Game
	db.Where("title = ?", title).First(&game)

	if game.ID != 0 {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Game with	same title exitsts",
			Message: "Pls choose another title for the game",
		})
		return "GAME_EXISTS"
	}

	newGame := database.Game{Title: title, Description: description}

	result := db.Create(&newGame)
	if result == nil {
		return "ERROR_CREATING"
	}

	return fmt.Sprint(newGame.ID)
}

func (a *App) LoadGames(count int, skip int) ([]database.Game, error) {
	db := database.GetDatabase()
	if db == nil {
		return nil, fmt.Errorf("NO_DATABASE")
	}

	var games []database.Game
	db.Limit(10).Offset(skip).Find(&games)
	//Return categories to client side here
	return games, nil
}

// func (a *App) EraseCategory(id int) string {
// 	db := database.GetDatabase()
// 	if db == nil {
//
// 		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
// 			Type:    runtime.InfoDialog,
// 			Title:   "Database Error",
// 			Message: "Couldnt connect to database",
// 		})
// 		return "NO_DATABASE"
// 	}
//
// 	var category database.Category
// 	db.First(&category, id)
// 	if category.ID == 0 {
//
// 		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
// 			Type:    runtime.InfoDialog,
// 			Title:   "Database Error",
// 			Message: "Category doesn't exist",
// 		})
// 		return "NO_CATEGORY"
// 	}
//
// 	db.Delete(&category)
//
// 	if db.Error != nil {
//
// 		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
// 			Type:    runtime.InfoDialog,
// 			Title:   "Database Error",
// 			Message: "Error Deleting Category",
// 		})
// 		return "ERROR_DELETING"
// 	}
//
// 	return "OK"
// }
//
// func (a *App) EditCategory(id uint, newTitle string) string {
// 	db := database.GetDatabase()
//
// 	var category database.Category
//
// 	var categoryWithSameTitle database.Category
//
// 	db.Where("title = ?", newTitle).First(&categoryWithSameTitle)
//
// 	if categoryWithSameTitle.ID != 0 {
// 		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
// 			Type:    runtime.InfoDialog,
// 			Title:   "Database Error",
// 			Message: "There is another category with the same title",
// 		})
// 		return "CATEGORY_EXISTS"
// 	}
//
// 	db.First(&category, id)
//
// 	if category.ID == 0 {
// 		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
// 			Type:    runtime.InfoDialog,
// 			Title:   "Database Error",
// 			Message: "Category doesn't exist",
// 		})
// 		return "ERROR_EDITING"
// 	}
//
// 	category.Title = newTitle
// 	db.Save(&category)
// 	return "OK"
// }
//
// func (a *App) LoadCategoryName(id int) string {
// 	db := database.GetDatabase()
//
// 	var category database.Category
// 	db.First(&category, id)
// 	if category.ID == 0 {
// 		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
// 			Type:    runtime.InfoDialog,
// 			Title:   "Database Error",
// 			Message: "Category doesn't exist",
// 		})
// 		return "ERROR_EDITING"
// 	}
//
// 	return category.Title
//
// }
