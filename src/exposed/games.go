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

	db.Model(&game).Association("Categories").Clear()
	db.Unscoped().Delete(&game)

	if db.Error != nil {

		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.InfoDialog,
			Title:   "Database Error",
			Message: "Error deleting game",
		})
		db.Commit()
		return fmt.Errorf("ERROR_DELETING")
	}

	return nil

}

func (a *App) GetGameInfo(id uint) (database.Game, error) {
	db := database.GetDatabase()
	if db == nil {
		CantConnectToDatabaseMessage(a)
	}

	var game database.Game
	db.First(&game, id)
	if game.ID == 0 {
		return game, fmt.Errorf("GAME_DOESNT_EXIST")
	}

	return game, nil
}

func (a *App) EditGame(id uint, title string, description string, categories []uint) (database.Game, error) {
	db := database.GetDatabase()
	if db == nil {
		CantConnectToDatabaseMessage(a)
	}

	var game database.Game
	db.First(&game, id)
	if game.ID == 0 {
		return game, fmt.Errorf("GAME_DOESNT_EXIST")
	}

	game.Title = title
	game.Description = description

	var categoriesFromDatabase []database.Category
	db.Where("id IN (?)", categories).Find(&categoriesFromDatabase)

	db.Model(&game).Association("Categories").Replace(categoriesFromDatabase)

	return game, nil
}

func (a *App) GetCategoriesFromGame(id uint) ([]database.Category, error) {
	db := database.GetDatabase()
	if db == nil {
		CantConnectToDatabaseMessage(a)
	}
	var game database.Game
	db.First(&game, id)
	if game.ID == 0 {
		return nil, fmt.Errorf("GAME_DOESNT_EXIST")
	}

	var categories []database.Category
	db.Model(&game).Association("Categories").Find(&categories)

	return categories, nil
}
