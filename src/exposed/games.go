package app

import (
	"fmt"
	"tcu/src/database"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) CreateNewGame(title string, description string, categories []uint) (string, error) {
	db := database.GetDatabase()
	if db == nil {

		return "", fmt.Errorf("NO_DATABASE")
	}
	//
	var game database.Game
	db.Where("title = ?", title).First(&game)
	//
	if game.ID != 0 {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Already used title",
			Message: "Pls choose another title for the game",
		})
		return "", fmt.Errorf("GAME_TITLE_EXISTS")
	}
	//
	newGame := database.Game{Title: title, Description: description}
	var categoriesFromDatabase []database.Category
	db.Where("id IN (?)", categories).Find(&categoriesFromDatabase)

	for _, category := range categoriesFromDatabase {
		db.Model(&newGame).Association("Categories").Append(&category)

	}
	//
	result := db.Create(&newGame)
	if result == nil {
		return "", fmt.Errorf("ERROR_CREATING_GAME")
	}

	db.Save(&newGame)

	return fmt.Sprint(newGame.ID), nil
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

func (a *App) EraseGame(id uint) error {
	db := database.GetDatabase()
	if db == nil {

		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Couldn't connect to database",
		})
		return fmt.Errorf("NO_DATABASE")
	}

	var game database.Game
	db.First(&game, id)
	if game.ID == 0 {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Game doesn't exist",
		})
		return fmt.Errorf("Game doesn't exist")
	}

	db.Unscoped().Delete(&game)

	if db.Error != nil {

		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Error deleting game",
		})
		return fmt.Errorf("ERROR_DELETING")
	}

	return nil

}

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
