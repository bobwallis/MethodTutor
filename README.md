 # Method Tutor

## Project Goals

Remember JBlueline? Like writing methods out on paper but faster, on your phone, and using mid-2000s technology. This is like that but using mid-2010s technology. I originally wrote it for [my Android app](https://play.google.com/store/apps/details?id=uk.me.rsw.bl), and it's now linked from [my website](https://rsw.me.uk/blueline/) as well.

## Output

Once built the tutor can be found at `./web/index.html`, the other files in the folder are also required.

The results are published online at [bobwallis.github.io/MethodTutor/](https://bobwallis.github.io/MethodTutor/).

## Using

Going to the site will, by default, drop you onto the part where you search for methods. Type the name into the "Method Name" box and click on the search results to populate the stage and place notation.

Clicking through to the next bit will let you choose which bell to steer, and some other basic options. And clicking "Go" will then launch the tutor.

Use the arrow keys on your keyboard, or tap the left/right/bottom side of the screen, to steer through the blue line.

If you want to then you can link directly to a particular method by doing [something like this](https://bobwallis.github.io/MethodTutor/#title=Stedman%20Triples&notation=3.1.7.3.1.3%2C1&stage=7&ruleoffs={"from"%3A-3%2C"every"%3A6}). If you do so then I would recommend opening up in a window of size 500 by 650 or so. If you install as a web app then in some browsers you can collapse the titlebar to give the illusion you are running a native application.

## Development

I use Visual Studio Code to develop in, and you can too using the above button. But the only real dependencies are NPM and Gulp.

Source code for the various parts of the project are in the `/src` folder. Edit files, and then run `gulp` to build them and deposit distributable versions into the `/web` folder. To watch for changes and automatically rebuild files, run `gulp watch`.

To test the code, run `npm start` which will launch a web server that you can open at <http://localhost:8080>. If you are using Visual Studio Code you can use the 'Run & Debug' functionality.

To update the project's dependencies with new minor releases, run `npm update --save-dev`. Run `npm outdated` to find new major versions, and think about upgrading to them.
