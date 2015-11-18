/**
 * Copyright 2015 Chungseok Baek
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/

/**
 * DESCRIPTION: A prototype for web app to provide public profile of local engineers
 * NOTICE:  no validation for the url parameter was made yet.
 **/
package e114

import (
	"html/template"
	"net/http"
)

// constants
const (
	APIKEY   = "f084038597a5a436ef1e506e49c87f0a"
	MAIN_URL = "e114.html"
	ERROR_M  = "<center>sorry we are working on this</center>"
)

// init
func init() {
	http.HandleFunc("/", handler)
}

type Model struct {
	APIKey string
}

// basic handler function
func handler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles(MAIN_URL)

	err := t.Execute(w, &Model{
		APIKey: APIKEY,
	})
	if err != nil {
		http.Error(w, err.Error(), 500)
		http.Error(w, ERROR_M, 500)
	}
}
