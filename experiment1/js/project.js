function main() {
  const fillers = {
    relationship: ["best friend", "coworker", "partner", "wife", "husband", "boyfriend", "girlfriend", "friend", "cat", "pet rock"],
    interest: ["play too much League of Legends", "scream too loud in my basement", "make too many bombs", "watch too many hedge funds", "drink too much", "sniff too many sharpies", "am too broke", "am too short"],
    action: ["seek religion", "'explode already'", "find a job", "commit tax evasion", "take a long drive", "touch grass"],
    ultimatum: ["leave me forever", "harm me", "commit a federal crime", "kill my fish", "tell my friends I killed a man", "start only eating glue from now on", "shit in my pillow"],
    age1: ["20", "37"],
    age2: ["29", "45"],
    hypocrite: ["eat rocks", "scream at me for hours", "honk my car whenever I leave it", "throw my games", "steal my emergency money", "breathe"],
    redflag:["double text", "peel bananas the wrong way", "speak not normally", "secretly sniff glue", "can't pay for their own food"], 
  };

  const template = `Am I the Asshole?

  My $relationship has told me I $interest and I should $action or they'll $ultimatum. To give some context, I'm $age1 and they're $age2. I am also significantly wealthier than them. I've invested a lot into this relationship and I generally tend to get the worse end of the stick.

  Also I feel like when they $hypocrite I feel terribly wronged, but I'm not sure if I'm over-reacting. Additionally, I find that they often $redflag and although it's unrelated, I believe it's necessary to consider this in the situation. What should I do here, $action? AITA?

  `;


  // STUDENTS: You don't need to edit code below this line.

  const slotPattern = /\$(\w+)/;

  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }

  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }

    /* global box */
    $("#box").innerText = story;
  }

  /* global clicker */
  $("#clicker").onclick = generate;

  generate();
}

main();