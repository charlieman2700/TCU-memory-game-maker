package database

import (
	"fmt"
	"os"
	"sync"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Title       string
	Description string
}

var lock = &sync.Mutex{}

var database *gorm.DB

func createNewDatabase(path string) *gorm.DB {
	if database == nil {
		lock.Lock()
		defer lock.Unlock()
		if database == nil {
			fmt.Println("Creating single instance now.")

			f, err := os.Create("path")
			if err != nil {
				panic(err)
			}
			defer f.Close()

			fmt.Println(f.Name())
			db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
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

func getInstance(path string) *gorm.DB {

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
