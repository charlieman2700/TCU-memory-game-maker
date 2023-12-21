package app

import (
	"fmt"
	"tcu/src/database"
)

func (a *App) AddTempImage(bytes string, imageType string) (string, error) {

	file := []byte(bytes)
	db := database.GetDatabase()

	if db == nil {
		return "", fmt.Errorf("NO_DATABASE")
	}

	var tempImage database.TempImage = database.TempImage{
		Bytes: file,
		Type:  imageType,
	}

	db.Save(&tempImage)

	return fmt.Sprint(tempImage.ID), nil

}

func (a *App) LoadTempImage(id string) (database.TempImage, error) {

	db := database.GetDatabase()
	var tempImage = database.TempImage{}
	db.First(&tempImage, id)
	if db.Error != nil {
		return database.TempImage{}, db.Error
	}

	return tempImage, nil

}
