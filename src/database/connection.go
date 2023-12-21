package database

import (
	"fmt"
	"os"
	"regexp"
	"sync"

	"tcu/src/environment"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var lock = &sync.Mutex{}

var database *gorm.DB

func DevDatabase() {
	if environment.DEV_ENV {
		path := "dev.db"
		_, error := os.Stat(path)

		// check if error is "file not exists"
		if os.IsNotExist(error) {
			println("Entra en crear")
			CreateNewDatabase(path)
		} else {
			println("Entra en cargar")
			LoadDatabase(path)
		}

	}
}

func CreateNewDatabase(path string) (*gorm.DB, error) {
	if database == nil {
		lock.Lock()
		defer lock.Unlock()
		if database == nil {

			fmt.Println("Creating single instance now.")
			regexAllBeforePoint := regexp.MustCompile("^[^.]*")
			cleanName := regexAllBeforePoint.FindString(path)
			newPath := cleanName + ".db"

			f, err := os.Create(newPath)
			if err != nil {
				return nil, err
			}
			println(f.Name())
			defer f.Close()

			db, err := gorm.Open(sqlite.Open(newPath), &gorm.Config{})
			db.AutoMigrate(&Category{}, &Game{}, &Pair{}, &TempImage{})

			if err != nil {
				panic("failed to connect database")
			}
			database = db
		} else {
			fmt.Println("Single instance already created.")
		}
	} else {
		fmt.Println("Single instance already created.")
	}

	return database, nil
}

func LoadDatabase(path string) *gorm.DB {

	if database == nil {

		lock.Lock()
		defer lock.Unlock()
		if database == nil {
			fmt.Println("Creating single instance now.")
			db, err := gorm.Open(sqlite.Open(path), &gorm.Config{})
			if err != nil {
				panic("failed to connect database")
			}
			database = db
			db.AutoMigrate(&Category{}, &Game{}, &Pair{}, &TempImage{})

		} else {
			fmt.Println("Single instance already created.")
		}
	} else {
		fmt.Println("Single instance already created.")
	}
	return database
}

func GetDatabase() *gorm.DB {
	return database
}
