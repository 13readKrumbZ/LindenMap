package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	//"errors"
)

type marker struct {
	ID       string     `json:"id"`
	Title    string     `json:"title"`
	Geocode  [2]float64 `json:"geocode"`
	Popup    string     `json:"popup"`
	Comments []string   `json:"comments"`
}

var markers = []marker{
	{ID: "1", Title: "M1", Comments: []string{"Yay!"}, Geocode: [2]float64{6.002, -58.302}, Popup: "Marker 1"},
	{ID: "2", Title: "M2", Comments: []string{"Yay2!"}, Geocode: [2]float64{6.005, -58.305}, Popup: "Marker 2"},
	{ID: "3", Title: "M3", Comments: []string{"Yay3!"}, Geocode: [2]float64{6.008, -58.31}, Popup: "Marker 3"},
}

func getMarkers(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, markers)

}

func createMarker(c *gin.Context) {
	var newMarker marker

	if err := c.BindJSON(&newMarker); err != nil {
		return
	}

	markers = append(markers, newMarker)
	c.IndentedJSON(http.StatusCreated, newMarker)
}

//func deleteMarker(c *gin.Context) {}

func main() {

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "DELETE", "GET"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))
	router.GET("/markers", getMarkers)
	router.POST("/markers", createMarker)
	router.Run("localhost:8080")

}
