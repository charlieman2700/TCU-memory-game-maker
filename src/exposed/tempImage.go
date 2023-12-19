package app

import (
	"fmt"
	"tcu/src/database"
)

func (a *App) AddTempImage(bytes []byte) (string, error) {
	db := database.GetDatabase()
	if db == nil {
		return "", fmt.Errorf("NO_DATABASE")
	}
	//
	var tempImage database.TempImage = database.TempImage{
		Bytes: bytes,
	}

	db.Save(&tempImage)

	return fmt.Sprint(tempImage.ID), nil
}
