
minorityownedbusiness

Application for mosaic

---------------------------------------------------------------------------------------

# Start application 
npm i
npx expo start

# API
api.js (GLOBAL URL is here) -> services -> export api to diffrent component

# Colors 
blue - #16a1c0
orange -  #E07B39

# Services Folder - All APIs are calling in this folder

# Product Page
<ProductGrid> -> for all product main 
<ProductPreview/> - It is a small view on home page for product



# Services Page
/service/list
All service - <ServiceCategory.tsx>
Small Preview in Home page - <ServicePreviewShort.tsx> --- For this their is addtional card because layout is different from All services. <ServiceCard.tsx>

# Service Detail Page
https://api.minorityownedbusiness.info/api/services/just-chcking - It is coming from slug
Have 2 diffrent thing
1. slug - check and send and there is one file for slug which will send into <ServiceDetails> --->  [serviceslug].tsx
2. Workflow - <ServiceCategory> -> [serviceslug].tsx -> <ServiceDetails>
3. same for short preview in home page - index.js -> [serviceslug].tsx -> <ServiceDetails>





# Deploy in android
npx expo prebuild - to create android folder
-- upload as open project in android studio and select that android folder in root project

npx expo run:android






