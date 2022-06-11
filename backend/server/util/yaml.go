package util

import (
	"io/ioutil"

	"gopkg.in/yaml.v3"
)

func LoadConf(filePath string) (map[string]interface{}, error) {
	yamlFile, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	result := make(map[string]interface{})
	if err := yaml.Unmarshal(yamlFile, &result); err != nil {
		return nil, err
	}

	return result, nil
}

func SaveConf(filePath string, data map[string]interface{}) error {
	text, err := yaml.Marshal(&data)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(filePath, text, 0644)
	return err
}
