import React from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)
const generationConfig = {
    temperature: 1.5,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        Recipe: {
          type: "object",
          properties: {
            Name: {
              type: "string"
            },
            Ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  Name: {
                    type: "string"
                  },
                  Measurement: {
                    type: "string"
                  }
                },
                required: [
                  "Name",
                  "Measurement"
                ]
              }
            },
            Allergens: {
              type: "array",
              items: {
                type: "string"
              }
            },
            Steps: {
              type: "array",
              items: {
                type: "string"
              }
            }
          },
          required: [
            "Name",
            "Ingredients",
            "Allergens",
            "Steps"
          ]
        }
      },
      required: [
        "Recipe"
      ]
    },
  };
const GenAi = async ({link, allergens}) => {
        console.log('fdkajflkdasj')
        console.log(link)
        console.log(allergens)
        const parts = [
            {text: "I need you to take this input \"https://www.ihearteating.com/easy-sticky-buns/\" and decide if it is a link or a recipe. Then, if it IS a link extract ONLY the recipe ingredients with their amounts AND the steps needed to cook the dish from the website. THEN look through all the ingredients. For every ingredient that is an allergen from THIS list of allergens [nuts], add it to a list of ingredients you need to replace. THEN once you are done generating that list, take EVERY item in that list and find A DIRECT substitute that is the MOST similar to the original ingredient. ONCE you find the substitute for the original ingredient, Remove that original ingredient from the ingredients list and add the substitute ingredient and its quantity. Determine if there are modified steps needed when using an ingredient and MODIFY the original steps.  Return the name of the recipe as Name within JSON, the modified ingredients as an array of Ingredients within the Ingredients JSON object. Each item in the array is an objeFor each ingredient within this object , name of the ingredient without its measurement as Name, quantity of ingredient as Measurement. Outside this ingredients object array, return an array of strings named Allergens. Then lastly an array of strings named Steps that contain the modified steps only."},
            {text: "output: {\"Name\": \"Easy Sticky Buns\", \"Ingredients\": [{\"Name\": \"yeast\", \"Measurement\": \"2 1/4 teaspoons active dry\"}, {\"Name\": \"milk\", \"Measurement\": \"1/2 cup warm\"}, {\"Name\": \"sugar\", \"Measurement\": \"1/4 cup granulated\"}, {\"Name\": \"all-purpose flour\", \"Measurement\": \"1 1/2 cups\"}, {\"Name\": \"salt\", \"Measurement\": \"1/2 teaspoon\"}, {\"Name\": \"egg\", \"Measurement\": \"1 large\"}, {\"Name\": \"butter, softened\", \"Measurement\": \"2 tablespoons\"}, {\"Name\": \"butter, melted\", \"Measurement\": \"1/4 cup\"}, {\"Name\": \"brown sugar\", \"Measurement\": \"1/2 cup packed light or dark\"}, {\"Name\": \"corn syrup\", \"Measurement\": \"2 tablespoons light\"}, {\"Name\": \"cinnamon\", \"Measurement\": \"1 teaspoon ground\"}, {\"Name\": \"sunflower seeds\", \"Measurement\": \"1/4 cup\"}, {\"Name\": \"raisins\", \"Measurement\": \"1/4 cup (optional)\"}], \"Allergens\": [\"nuts\"], \"Steps\": [\"In the bowl of a stand mixer fitted with the dough hook attachment, combine the warm milk, yeast, and sugar. Let sit for 5 minutes, until the yeast is foamy.\", \"Add the flour, salt, egg, and 2 tablespoons softened butter. Mix on low speed until combined, then increase speed to medium and knead for 5 minutes, until the dough is smooth and elastic. If the dough is too sticky, add 1 tablespoon of flour at a time until it is no longer sticky.\", \"Place the dough in a greased bowl, cover, and let rise in a warm place for 1 hour, or until doubled in size.\", \"While the dough is rising, make the filling: In a medium bowl, combine the melted butter, brown sugar, corn syrup, cinnamon, sunflower seeds, and raisins (if using).\", \"Punch down the dough and roll it out into a 12x18 inch rectangle. Spread the filling evenly over the dough.\", \"Starting at the long end, roll the dough up tightly into a log. Cut the log into 12 equal slices.\", \"Pour the remaining 1/4 cup melted butter into a 9x13 inch baking dish. Arrange the rolls in the dish.\", \"Cover the rolls and let rise in a warm place for 30 minutes, or until doubled in size.\", \"Preheat oven to 350 degrees F (175 degrees C).\", \"Bake the rolls for 20-25 minutes, or until golden brown. Let cool for a few minutes before inverting onto a serving platter.\"]}"},
            {text: "take this input \"https://www.indianhealthyrecipes.com/chicken-korma-recipe/\". The list of allergens: ['nuts']. Check every ingredient within the recipe. If an ingredient is an allergen that matches with anything in the list of allergens, add it to the replacement list. For every ingredient in replacement list, find an ingredient similar to the ingredient in replacement list that is NOT an allergen for ANY of the allergens in the provided allergen list. Ingredients derived from an allergen are usually an allergen For example cashew paste is an allergen for nuts so do NOT include cashew paste as a substitute. ONCE you find the substitute for the original ingredient, Remove that original ingredient from the ingredients list and add the substitute ingredient and its quantity. Determine if there are modified steps needed when using an ingredient and MODIFY the original steps.  Return the name of the recipe as Name within JSON, the modified ingredients as an array of Ingredients within the Ingredients JSON object. Each item in the array is an objeFor each ingredient within this object , name of the ingredient without its measurement as Name, just the quantity of ingredient as Measurement. Outside this ingredients object array, return an array of strings named Allergens that contains the allergens provided. Then lastly an array of strings named Steps that contain the modified steps only."},
            {text: "output: {\"Name\": \"Chicken Korma\", \"Ingredients\": [{\"Name\": \"oil\", \"Measurement\": \"3 tablespoons\"}, {\"Name\": \"chicken\", \"Measurement\": \"1 pound boneless, cut into bite-sized pieces\"}, {\"Name\": \"salt\", \"Measurement\": \"to taste\"}, {\"Name\": \"turmeric powder\", \"Measurement\": \"1/4 teaspoon\"}, {\"Name\": \"red chili powder\", \"Measurement\": \"1 teaspoon\"}, {\"Name\": \"ginger garlic paste\", \"Measurement\": \"1 tablespoon\"}, {\"Name\": \"onion, sliced\", \"Measurement\": \"1 medium\"}, {\"Name\": \"green chilies, slit\", \"Measurement\": \"2\"}, {\"Name\": \"tomato, chopped\", \"Measurement\": \"1 medium\"}, {\"Name\": \"coriander powder\", \"Measurement\": \"1 teaspoon\"}, {\"Name\": \"cumin powder\", \"Measurement\": \"1/2 teaspoon\"}, {\"Name\": \"garam masala powder\", \"Measurement\": \"1/2 teaspoon\"}, {\"Name\": \"yogurt/curd (whisked)\", \"Measurement\": \"1/2 cup\"}, {\"Name\": \"cream/milk\", \"Measurement\": \"1/4 cup\"}, {\"Name\": \"kasuri methi/dried fenugreek leaves\", \"Measurement\": \"1/2 teaspoon\"}, {\"Name\": \"coriander leaves (chopped)\", \"Measurement\": \"2 tablespoons\"}, {\"Name\": \"water\", \"Measurement\": \"as needed\"}], \"Allergens\": [\"nuts\"], \"Steps\": [\"Heat oil in a pan. Add chicken pieces, salt, turmeric powder, and red chili powder. Cook on medium flame until chicken is no longer pink.\", \"Add ginger-garlic paste. Saute for a minute.\", \"Add sliced onions and green chilies. Saute until onions turn translucent.\", \"Add chopped tomatoes, coriander powder, cumin powder and garam masala powder. Mix well and saute for 2-3 minutes. You can add 2-3 tablespoons of water if needed.\", \"Add whisked yogurt. Mix well. Saute for 2-3 minutes.\", \"Add 1/2 cup of water, cover and let it simmer until chicken is cooked and the gravy thickens.\", \"Add cream, kasuri methi, and coriander leaves. Give it a good mix and switch off the flame.\"]}"},
            {text: "input: \"https://sallysbakingaddiction.com/soft-peanut-butter-cookie-recipe/\" allergens: ['nuts']"},
            {text: "output: {\"Name\": \"Soft Peanut Butter Cookies\", \"Ingredients\": [{\"Name\": \"butter\", \"Measurement\": \"1/2 cup (1 stick) unsalted, softened to room temperature\"}, {\"Name\": \"sunflower seed butter\", \"Measurement\": \"1/2 cup creamy\"}, {\"Name\": \"granulated sugar\", \"Measurement\": \"1/2 cup\"}, {\"Name\": \"packed light or dark brown sugar\", \"Measurement\": \"1/4 cup\"}, {\"Name\": \"egg\", \"Measurement\": \"1 large\"}, {\"Name\": \"vanilla extract\", \"Measurement\": \"1 teaspoon\"}, {\"Name\": \"all-purpose flour\", \"Measurement\": \"1 and 1/4 cups\"}, {\"Name\": \"baking soda\", \"Measurement\": \"1/2 teaspoon\"}, {\"Name\": \"salt\", \"Measurement\": \"1/4 teaspoon\"}, {\"Name\": \"sugar, for rolling\", \"Measurement\": \"1/4 cup\"}], \"Allergens\": [\"nuts\"], \"Steps\": [\"Whisk the butter, sunflower seed butter, granulated sugar, and brown sugar together in a large bowl until smooth. Mix in the egg and vanilla extract.\", \"In a separate bowl, whisk the flour, baking soda, and salt together. Slowly add to the wet ingredients and mix until just combined. Don't overmix.\", \"Cover and chill the dough for at least 2 hours (and up to 3 days). Chilling is mandatory for this cookie dough.\", \"Preheat oven to 375 degrees F (190 degrees C). Line baking sheets with parchment paper or silicone baking mats.\", \"Pour 1/4 cup granulated sugar into a small bowl. Roll dough into 1 and 1/2 tablespoon-sized balls, then roll in sugar. Arrange on baking sheets 2 inches apart.\", \"Bake for 10-11 minutes or until lightly browned on the outside and still very soft in the center. The cookies will slightly puff up, then sink down as they cool.\", \"Let cool on baking sheets for 5 minutes before transferring to a wire rack to cool completely.\"]}"},
            {text: "input: \"https://www.theclevercarrot.com/2014/01/sourdough-bread-a-beginners-guide/\" allergens: ['gluten']. For allergies such as gluten which are formed, make sure that the ingredients do not FORM gluten. Use gluten-free flour or a separate binder instead of using normal flour. For an ingredient that typically contains gluten such as sourdough starter, specify to use gluten-free sourdough starter."},
            {text: "output: {\"Name\": \"The Best Sourdough Bread\", \"Ingredients\": [{\"Name\": \"gluten-free sourdough starter\", \"Measurement\": \"1 cup (227g) bubbly\"}, {\"Name\": \"water\", \"Measurement\": \"1 cup (227g) lukewarm\"}, {\"Name\": \"gluten-free all purpose flour\", \"Measurement\": \"3 and 1/4 cups (390g)\"}, {\"Name\": \"xanthan gum\", \"Measurement\": \"1 teaspoon (if your blend doesn't already include it)\"}, {\"Name\": \"salt\", \"Measurement\": \"2 teaspoons (12g)\"}, {\"Name\": \"extra gluten-free flour, for dusting\", \"Measurement\": \"as needed\"}], \"Allergens\": [\"gluten\"], \"Steps\": [\"In a large bowl, combine the starter and water. Stir in 3 cups (390g) of flour, and xanthan gum (if using) and mix to form a shaggy dough. It's ok if there are a few dry bits, it will come together with more kneading. Let dough rest for at least 30 minutes, and up to an hour. This is an important step called the autolyse which gives the gluten-free flour a chance to hydrate, which will make the dough less sticky as you knead.\", \"Turn the dough out onto a lightly floured surface and knead for 5 minutes. Since you are using gluten-free flour, you will not see the same gluten development as regular bread. Your goal here is to work the dough so that it forms a smooth ball that springs back lightly when poked. This will take practice. You may need to adjust the amount of water by a tablespoon or two to get it to the right consistency, but resist the urge to add too much because it will result in a dense loaf.\", \"Place the dough in a large, lightly greased bowl. Turn to coat the dough in the oil and cover with a clean tea towel or plastic wrap. Let the dough rise for at least 8 and up to 10 hours.\", \"Gently remove the dough from the bowl, being careful not to deflate it, and transfer to a lightly floured surface. Form the dough into a tight ball.\", \"Generously flour your proofing basket or line a medium bowl with a clean tea towel and dust with flour. Place the dough, seam side-up, in the prepared bowl or basket and cover tightly with plastic wrap. Allow to rise until almost doubled in size, at least 4 hours and up to 8 hours.\", \"Preheat oven with dutch oven inside to 450F (232C).\", \"Remove the preheated dutch oven from the oven and carefully remove the lid. Lift the dough from the bowl and gently place in the center of the dutch oven. If desired, score the loaf with a sharp, serrated knife.\", \"Place the lid back on the dutch oven and return to the oven. Immediately reduce the temperature to 425F (218C) and bake for 30 minutes.\", \"After 30 minutes, remove the lid from the dutch oven and continue to bake for another 15-20 minutes or until golden brown.\", \"Remove bread from oven and let cool in the dutch oven for at least 30 minutes before slicing and serving.\"]}"},
            {text: "input \"https://thewoksoflife.com/milk-bread-2/\" allergens: ['lactose']"},
            {text: "output: {\"Name\": \"Hokkaido Milk Bread\", \"Ingredients\": [{\"Name\": \"warm water\", \"Measurement\": \"1/2 cup (120ml)\"}, {\"Name\": \"active dry yeast\", \"Measurement\": \"2 teaspoons\"}, {\"Name\": \"granulated sugar\", \"Measurement\": \"1 tablespoon\"}, {\"Name\": \"bread flour\", \"Measurement\": \"3 cups (375g)\"}, {\"Name\": \"nonfat dry milk powder\", \"Measurement\": \"1/4 cup (30g)\"}, {\"Name\": \"salt\", \"Measurement\": \"1 teaspoon\"}, {\"Name\": \"egg\", \"Measurement\": \"1 large\"}, {\"Name\": \"unsalted butter, softened\", \"Measurement\": \"2 tablespoons (30g)\"}, {\"Name\": \"tangzhong\", \"Measurement\": \"all of it (see recipe below)\"}, {\"Name\": \"egg wash (1 egg yolk + 1 tablespoon water)\", \"Measurement\": \" \"}], \"Allergens\": [\"lactose\"], \"Steps\": [\"Make the Tangzhong: Combine 1/4 cup (60g) water and 1 tablespoon bread flour in a small saucepan. Whisk until no lumps remain. Heat over low heat for 3-5 minutes, whisking constantly, until the mixture thickens into a smooth, pudding-like paste. It should be thick enough to coat the back of a spoon.\", \"Remove from heat and transfer to a small bowl. Let cool to room temperature before using. To cool it faster, place the bowl in a larger bowl filled with ice water. Once cooled, the tangzhong can be made ahead of time and refrigerated in an airtight container for up to 2 days.\", \"Prepare the Dough: In the bowl of a stand mixer fitted with the dough hook, combine warm water, yeast, and 1 tablespoon sugar. Stir and let sit for 5 minutes, until the yeast is foamy.\", \"Add bread flour, milk powder, salt, 1 egg, softened butter, and the cooled tangzhong to the yeast mixture. Knead on low speed for 1-2 minutes, or until all ingredients are incorporated. Increase to medium speed and knead for 10 minutes, or until a smooth, elastic dough forms.\", \"First Rise: Transfer the dough to a lightly greased bowl, cover with plastic wrap, and let rise in a warm place for 1-1.5 hours, or until doubled in size.\", \"Punch down the dough to release the air and transfer it to a lightly floured surface. Divide the dough into 8 equal portions. Shape each portion into a smooth ball, tucking the edges under to create a taut surface.\", \"Second Rise: Arrange the dough balls in a greased 9x5 inch loaf pan, ensuring they are evenly spaced. Cover with plastic wrap and let rise in a warm place for 45 minutes to 1 hour, or until doubled in size.\", \"Preheat the Oven & Prepare Egg Wash:  Towards the last 15 minutes of the second rise, preheat the oven to 350 degrees F (175 degrees C). Make the egg wash by whisking 1 egg yolk and 1 tablespoon of water together.\", \"Bake: Gently brush the egg wash over the risen dough, avoiding deflation. Bake for 30-35 minutes, or until the bread is golden brown and sounds hollow when tapped.\", \"Cool Completely: Remove from the oven and let the bread cool in the pan for 10 minutes. Transfer the bread to a wire rack to cool completely before slicing and serving.\"]}"},
            {text: `Link: ${link} allergens: [${allergens}]`},
          ];
        const model = genAI.getGenerativeModel({model: "gemini-1.5-pro",});
        try{
          console.log(`input: Input: '${link}' allergens: '${allergens}'`)
          const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
       // safetySettings: Adjust safety settings
       // See https://ai.google.dev/gemini-api/docs/safety-settings
        });
        const text = await result.response.text()
        console.log(JSON.parse(text));
        return text
        } catch(error){
            console.error("Failed to generate",error)
            throw error
        } 
  }

export default GenAi