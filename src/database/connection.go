package database

import (
	"fmt"
	"os"
	"regexp"
	"sync"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var lock = &sync.Mutex{}

var database *gorm.DB

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
			defer f.Close()

			fmt.Println(f.Name())

			db, err := gorm.Open(sqlite.Open(newPath), &gorm.Config{})
			db.AutoMigrate(&Category{})

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
