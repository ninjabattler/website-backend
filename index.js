const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/db');
const queries = require('./db/queries');
const postRoutes = require('./routes/postRouter');
const userRoutes = require('./routes/userRouter');
const path = require('path');
const fs = require('fs')

const defaultMetadata = `
<title>Ninjabattler</title>
<meta name='description' content="Website by a lunatic who knows a little node js and not much else" />
<meta property='og:locale' content='en_CA' />
<meta name='theme-color' content="#FFFF00" />
<meta property='og:type' content='website' />
<meta property='og:title' content="Ninjabattler" />
<meta property='og:image' content="https://ninjabattler.ca/static/media/Website robot.9ca91034.png" />
`

const pathToIndex = path.join(__dirname, "build/index.html")
app.get("/", (req, res) => {
  const raw = fs.readFileSync(pathToIndex, {'encoding': 'utf8'})
  const updated = raw.replace("_META_", defaultMetadata)

  res.send(updated)
})

app.get("/articles", (req, res) => {
  const raw = fs.readFileSync(pathToIndex, {'encoding': 'utf8'})
  const updated = raw.replace("_META_", defaultMetadata.replace(/(?<=<title>)Ninjabattler/, 'Ninjabattler - Articles'))

  res.send(updated)
})

app.get("/posts", (req, res) => {
  const raw = fs.readFileSync(pathToIndex, {'encoding': 'utf8'})
  const updated = raw.replace("_META_", defaultMetadata.replace(/(?<=<title>)Ninjabattler/, 'Ninjabattler - Posts'))

  res.send(updated)
})

app.get("/about", (req, res) => {
  const raw = fs.readFileSync(pathToIndex, {'encoding': 'utf8'})
  const updated = raw.replace("_META_", defaultMetadata.replace(/(?<=<title>)Ninjabattler/, 'Ninjabattler - About'))

  res.send(updated)
})

app.get("/posts/:review", (req, res) => {

  const splitReview = req.params.review.split('_')
  let formattedReview = '';
  splitReview.forEach((review) => {
    formattedReview += review + " "
  })

  formattedReview = formattedReview.slice(0, -1);
  
  queries.selectArticleMetadata(db, {title: formattedReview})
  .then((metaData) => {
    const raw = fs.readFileSync(pathToIndex, {'encoding': 'utf8'})
    const updated = raw.replace("_META_", `
    <meta charSet="utf-8" />
    <title>Ninjabattler - ${metaData.rows[0].title}</title>
    <meta name='description' content="Some words written by Ninjabattler" />
    <meta property='og:locale' content='en_CA' />
    <meta property='og:author' content='Ninjabattler' />
    <meta name='theme-color' content=${metaData.rows[0].colour} />
    <meta property='og:type' content='website' />
    <meta property='og:title' content=${metaData.rows[0].title} />
    <meta property='og:image' content=${metaData.rows[0].thumbnail} />
    <meta property='og:url' content="https://ninjabattler.ca/posts/${req.params.review}"" />
    `)
  
    res.send(updated)
  })
})

app.use(express.static(path.join(__dirname, 'build')))

db.connect()
.then(()=>{
  console.log('YO')
})
.catch((err) => {
  console.log(err)
})
app.use('/postData', postRoutes(db));
app.use('/users', userRoutes(db));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use(cors())

app.listen(5000, () => {
  console.log("server has started on port 5000");

  // queries.insertNewPost(db, {
  //   title: "It is complete!",
  //   colour: '#FFFF00',
  //   category: '32X',
  //   genre: 'Fighting',
  //   review: true,
  //   thumbnail: 'https://storage.googleapis.com/personal-webiste/Images/Cosmic%20Carnage%20thumbnail.png',
  //   video_header: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
  //   content: `<Paragraph text='To many people who hear the words SEGA and Fighting together, many would jump to the Virtua Fighter series, Eternal champions, or say “Oh yeah, da Sonic people!”. But if you jump to this game as your first example, then I have a few questions. That’s not to say I dislike the game in question, I believe Cosmic Carnage is a great hidden gem in the 32X library and in SEGA’s history, but it is far from perfect.' pageColour='#FFFF00'/>
  //   <Paragraph text="With beautiful character designs and animations but slow sluggish controls, an amazing soundtrack but an almost non-existent development history, there is a lot here I want to talk about, so let's dive into Cosmic Carnage for the Sega Genesis 32X." />
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Cosmic%20Carnage%20title.png' pageColour='#FFFF00'/>
  //   <TitleCard title='32-Bit Beginnings' pageColour='#FFFF00'/>
  //   <Paragraph text="During the console wars of the 16-bit era, SEGA had released their console, the SEGA Genesis, in August of 1989 to massive success. Later on they released an add-on for the console, the SEGA CD in October of 1992, in an attempt to cash in on cd’s which had more storage capacity and better audio quality than standard cartridges. Unfortunately the CD did not perform as well as they hoped, selling only 2.24 million units, so they decided “Fuck it let’s make another add-on” in 1994. The new add-on, the SEGA 32X, was made to be a cheaper option for people who owned a Genesis but did not have the funds to purchase the new and cool Saturn. But every console needs to have launch games, enter Cosmic Carnage." />
  //   <Paragraph text="There isn’t much to say about this game’s development history. It was developed by Almanic Corporation, in conjunction with ALU, and then published as a 32X exclusive by SEGA. The developers got their kits only 3 months before the games release date. They only had 3 months to build a launch title for a new console. SEGA didn’t even want to ship the game in the state it was in, but did anyway. I feel this is a good example of SEGA releasing something too early and not giving the devs enough time to polish everything out. Another good example of this would be Sonic 2006, a game riddled with bugs, terrible graphics and animation, and painfully long loading times. What could Cosmic Carnage have been with just a bit more time, who knows." />
  //   <Paragraph text="I’d love to talk more about the dev team here, but unfortunately there really isn’t anything about them online. The credit’s don’t list anyone’s position on the team other than special thanks. The only notable names I could dig up were from the project’s programmer, Takashi Shichijo, and composer, Hikoshi Hashimoto. Takashi has worked on the design of other games such as InuYasha: The Secret of the Cursed Mask and Shien's Revenge. Interestingly, his page on MobyGames shows that Cosmic Carnage is his only role in programming/engineering. Hikoshi Hashimoto on the other hand has had history with SEGA before Cosmic Carnage. He worked many SEGA games before such as Racing hero and Power Rangers. Unfortunately I couldn’t find much more information about his role in the project, much like everyone else in the credits. That just about covers what I found of the development, but what about the game itself?" />
  //   <TitleCard title='Intergalactic Prison Break' pageColour='#FFFF00'/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Prison%20Break.png' pageColour='#FFFF00' />
  //   <Quote quote='Let the carnage begin' source='-Cosmic Carnage'/>
  //   <Paragraph text='Cosmic Carnage plays like any other traditional 2D-fighter like Mortal Kombat, Street Fighter 2 or Eternal Champions. You choose a character with their own quirks and special moves and duke it out with an AI or another player. For the most part it doesn’t do anything new however, 4 of the 8 characters in question have a mechanic where you can swap between heavy and light armor pieces. There are 3 pieces per set and swapping between them will affect that character’s stats and special moves. The downside to this is that the armor can be broken in battle and if that happens, you will not only be weaker, but you will lose the special move tied to that armor piece. I think this is an awesome mechanic to have, it makes you carefully balance special moves and stats, or just go with one of the other 4 characters without this mechanic.' />
  //   <Paragraph text='While this all sounds good, the game will significantly slow down at times, usually whenever you use a special attack. Also speaking of special attacks, they feel impossible to pull off at times. I’m not the best at Street Fighter, but I can still consistently pull off a Haduken, not here. Maybe it’s just me, but it’s especially annoying for moves that require the taunt buttons, because failing them leaves you wide open for being countered. Besides that, you can also sort of use fatalities. By finishing off your opponent with a special move in the last round, you will either slice them in half, cut their arms off, or blow up their head. It ain’t much, but it’s something. One really weird thing about the characters though is that they will use the second color palette regardless of whether or not 2 of the same characters have been selected. So Naja will always be purple in single player if she’s your opponent.' />
  //   <Underline />
  //   <Paragraph text='The characters in Cosmic Carnage are split between two factions, a band of prisoners who have escaped, and a group of military soldiers who responded to a false distress beacon the prisoners sent out. The prisoners tried to hijack the new ship but ended up wrecking it to the point where it shall soon explode, and there is only one escape pod left. Now they must fight before the timer runs out for their own survival. The plot’s pretty solid I’d say, I mean it’s a fighting game, I don’t need a reason to fight, as long as I can stylishly tear the limbs off my opponents with my bare hands, I’m good.' />
  //   <Paragraph text='Besides the plot, this game also has very nice sprite work. The backgrounds are detailed and range from the asteroid belt to a giant elevator to many different views of space. All the shots of space are colourful and detailed and some backgrounds, such as the elevator, are animated beautifully as well. The cast of this game looks awesome as well. All the characters are made up of multiple parts all animated separately, and each armor piece has separate animations as well. The character’s armor also changes colour depending on which pieces you choose which I think is awesome. But this is also the 32X, and you can’t go two seconds without some forced in sprite scaling effects. For some attacks that get close up to the screen, such as Naruto’s sword, the sprites will be upscaled to give off a sudo-3D effect. Like it or hate, I think this is a pretty cool addition, although more people seem to hate it.' />
  //   <Paragraph text='One thing people seem to agree on though is how beautiful the soundtrack is. So many great pieces composed by Hikoshi Hashimoto. I’ll leave a link to the soundtrack on VintaGamers Paradise <a href="https://www.youtube.com/playlist?list=PL-vD6rIjXrcI4WtmwBwf5USskGS-s2PFj">here</a>. I highly, HIGHLY recommend you give it a listen.' />
  //   <TitleCard title='Cast of Carnage' pageColour='#FFFF00'/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Cylic.png' pageColour='#FFFF00' />
  //   <Quote quote="An entomologist's worst nightmare, this fighter is fast and agile, with a number of projectile attacks that allow him to wreak havoc from a distance." source='Manual' />
  //   <Paragraph text="First up for the Carnage, we have Cylic. What Ryu is to Street Fighter, I’d say Cylic is the same for Cosmic Carnage. He’s the first character who is highlighted in the menu and he even has a hadouken! In light armor, Cylic is good at keeping his distance with forwards and upwards projectiles and catch his opponents in mid-air. He also decimates the competition in heavy armor where he gets up close and personal with a rocket uppercut, a dash straight towards his opponent, and the ability to counter anyone who thinks of attacking below."/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Zena-Lan.png' pageColour='#FFFF00' />
  //   <Quote quote="This fiery fighter has a number of electrifying moves at her command. Speed and agility are her greatest assets." source='Manual' />
  //   <Paragraph text="Now we have the fast fiery fighter, Zena-Lan. As her description states, Zena has many attacks that help her out-speed her opponents. In light armor she can unleash a flurry of punches that ends with a projectile, unleash a sweeping kick, or grab her opponents in the air. She is still mobile and devastating in heavy armor to being able to dash towards her opponents, blast shocking rings from her shoulders, and unleash a flying kick straight upwards to take down any arial foes."/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Naruto.png' pageColour='#FFFF00' />
  //   <Quote quote="Elbow blades and a long sword give Naruto a long, sharp reach. He is especially proficient at aerial maneuvers and martial arts moves." source='Manual' />
  //   <Paragraph text="Yes he’s a ninja and, I’d say Naruto is my favourite character in Cosmic Carnage. Naruto has the unique ability to dash in any direction by double tapping. This can even be used in the air and is very helpful with dodging opponents. In light armor, Naruto is equipped with a long katana, and a spinning kick that destroys opponents. Heavy armor gives him arm blades and some force push attack that I for the life of me have no idea what it does? And yes… Naruto."/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Tyr.png' pageColour='#FFFF00' />
  //   <Quote quote="A master designer of weapons and bodysuits, Tyr has saved the best designs for himself. He uses the weight and power of his armor to support devastating charges and body slams. His drop throws are lethal." source='Manual' />
  //   <Paragraph text="Samurai Silver Surfer Tyr is the last of our armor wearing heroes. This character is a brute, but I don’t if it’s just me, he feels slower than the other characters even in light armor. This doesn’t matter however as he delivers crushing blows and can spin to avoid attacks. In light armor, Tyr can punch the ground to create pillars of fire, body check, and deliver a flying kick that’s sure to break some armor. While in heavy armor, he can fly towards his opponents, fire a blast of energy from his suit, and slam enemies into the ground from the air."/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Yug.png' pageColour='#FFFF00' />
  //   <Quote quote="This gorilla-like humanoid relies almost entirely on his long, powerful arms to deliver punishing hammer blows, bone-crushing holds and devastating throws. He has a very long reach. Yug's armor is built in, so he does not use additional armor. " source='Manual' />
  //   <Paragraph text="Onto our band of intergalactic misfits, we’ve got Yug. This gorilla like brute has a long reach and excels at delivering crushing blows. His main ability is grabbing opponents and performing one of many attacks on the such as throwing them across the stage, tossing them to the ground and slamming down into them, or just choking them as fast as you can push the punch button."/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Deamon.png' pageColour='#FFFF00' />
  //   <Quote quote="Deamon is as vicious as he is ugly, and he enjoys using his natural weapons to their best advantage. His long claws can tear an opponent to bloody shreds, and that scorpion stinger attached to the back of his isn't just for show. Deamon does not use armor. " source='Manual' />
  //   <Paragraph text="Forget what I said about Naruto, Deamon is my favourite character. Plus he looks like a xenomorph, which is awesome. His greatest strength is being able to pounce on his enemies ang slash at them as you spam the punch button. Besides being able to pounce and slash his enemies, Deamon can spin and slice his enemies with his claws, or use the tail on the back of his head like a whip. Honestly he is one of the most annoying characters to fight against, because getting to close will cause him to pounce on you. But he’s not nearly as annoying as..."/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Naja.png' pageColour='#FFFF00' />
  //   <Quote quote="To defeat this serpintine siren, you must steer clear of her tail, a weapon she uses as a battering ram, whip or vice. Naja doesn't need any armor. " source='Manual' />
  //   <Paragraph text="Naja is, in my opinion, the most obnoxious character to fight against. Her name and appearance are obviously derived from Naga, mythical half snake people. Her moveset consists of flying down towards the opponent, whipping her opponents with her tail, and constricting her opponents similarly to Deamon’s pounce attack. Her greatest strength is her tail which gives her a longer reach with kicks than other characters. Like Deamon however, she will take every opportunity she has to squeeze the life out of you if you get close, but it’s also hard to stay away because of her long reach, especially in the air!"/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/Talmac.png' pageColour='#FFFF00' />
  //   <Quote quote="This tall, dark and sinister fugitive uses razor claws, has lightning reflexes and powerful punches to hold his own in the arena. No one is sure whether he is wearing a mask, or if that is his real face. No one has gotten close enough to find out. Talmac does not use armor. " source='Manual' />
  //   <Paragraph text="Last but definitely not least, we have Talmac. Honestly looking at him, he looks like he could be the antagonist of this game with his tall imposing figure, skull-like face, mohawk, and sharp claws. Talmac’s abilities consist of sending a shockwave across the ground, flying towards (and sometimes through) his opponents, and reflecting projectiles back at his opponents which, yes, is just as annoying as it sounds."/>
  //   <TitleCard title='Conclusion' pageColour='#FFFF00'/>
  //   <Picture imageSrc='https://storage.googleapis.com/personal-webiste/Images/32x-Cyber-Brawl.jpg' pageColour='#FFFF00'/>
  //   <Paragraph text="In the end, despite its flaws, I think Cosmic Carnage is a pretty decent game. It’s got gorgeous visuals, an amazing soundtrack, beautiful characters, and is pretty fun with multiplayer if you can somehow convince people to play it. However it’s flaws are very noticeable with it’s ai that blocks at every moment possible, framerate problems, and special attacks that feel impossible to pull it off. However my least favourite part of the game is the ending. There are only 2 endings determined by if you beat the game quick enough or not. The first one, you die trying to get to the escape pod, the second you escape and live. That’s it. Pretty underwhelming honestly, they could have at least written something like a small blurb saying what the surviving character was going to do with their new found freedom.s" />
  //   <Paragraph text="Regardless of all this, I would still recommend at least trying this game. Don’t go out of your way to buy a 32X for it obviously but, with how easy emulation is nowadays, you can easily try it for free. I however bought because I like burning money on useless crap that makes me happy. That’s all I got to say, what are your thoughts on this lost gem, do you agree or disagree with me, did I miss anything, am I an asshole? Feel free to leave a comment and I’ll read it when I remember this site exists!" />`})
})