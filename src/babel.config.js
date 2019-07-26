const presets = [
    [
      "@babel/env",
      {
        targets: "> 0.25%, not dead"        
        //targets: "last 2 Chrome versions"
      },
    ],
  ];
  
module.exports = { presets };