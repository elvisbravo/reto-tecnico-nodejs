const translateFields = (data: any, isArralEnty: boolean) => {
  
  const translations: Record<string, string> = {
    name: 'nombre',
    height: 'altura',
    mass: 'peso',
    hair_color: 'color_pelo',
    skin_color: 'color_piel',
    eye_color: 'color_ojos',
    birth_year: 'año_nacimiento',
    gender: 'genero',
    homeworld: 'mundo_natal',
    films: 'peliculas',
    species: 'especies',
    vehicles: 'vehiculos',
    starships: 'naves_estelares',
    created: 'creado',
    edited: 'editado',
    url: 'url',
  };

  if (isArralEnty) {
    const translatedData: Record<string, any> = {};
    for (const key in data) {
      if (translations[key]) {
        translatedData[translations[key]] = data[key];
      } else {
        translatedData[key] = data[key];
      }
    }
    return translatedData;
  } else {
    return data.reduce((translatedData: any[], person: any) => {
      const translatedPerson: Record<string, any> = {};
      for (const key in person) {
        if (translations[key]) {
          translatedPerson[translations[key]] = person[key];
        } else {
          translatedPerson[key] = person[key];
        }
      }
      translatedData.push(translatedPerson);
      return translatedData;
    }, []);
  }
};

export { translateFields };
