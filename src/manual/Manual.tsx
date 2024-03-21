export default function Manual() {
    return (
    <div className="block w-[45rem] mx-auto space-y-4 mt-6">
        <div className="text-xl font-semibold">
            Manual
        </div>
        <div>
            <div className="font-semibold">Overview</div>
            <div>
                This program is a web-based digital synthesizer built with the Web Audio API.
                It consists of many connected modules that generate and modify sound.
                This manual will describe each module and provide information for how the module works/is used.
            </div>
        </div>
        <div>
            <div className="font-semibold">Basic Usage</div>
            <div>
                This program can be played by using the keys of your computer keyboard.
                The playable keys are on the number row and the three letter rows.
                Pressing on a key visually displays which note you are playing on a piano keyboard and
                plays audio through your speaker/headphone.
            </div>
        </div>
        <div>
            <div className="font-semibold mb-2">Piano</div>
            <div>
                See <span className="font-semibold">Basic Usage</span>
            </div>
        </div>
        <div>
            <div className="font-semibold mb-2">Oscillators</div>
            <div className="space-y-2">
                <p>
                    There are two oscillators {"("}<i>Osc1</i> and <i>Osc2</i>{")"} located on the top left of the screen. 
                    The following description and usage applies to both.
                </p>
                <p>Clicking the <i>Enable</i> checkbox enables or disables the oscillator from generate sound.</p>
                <p>The Waveshape dropdown allows the user to select the oscillators waveshape with selections: Sine, Sawtooth, Square, Triangle.</p>
                <p>
                    The <i>Octave</i> dropdown allows the user to increase or decrease the octave to play a note. 
                    For example, if you select 0 and play the key Z, you will hear the note C4 playing. 
                    If you select -1, and play the key Z, you will hear the note C3 playing.
                </p>
                <p>
                    The <i>Gain</i> slider lets the user set the gain of the oscillator.
                    This field is disabled and overriden by the <i>ADSR</i> if the <i>ADSR</i> is enabled.
                </p>
                <p>
                    The <i>Voices</i> dropdown lets the user select the number of oscillators playing at the same time. 
                    By default, it is set to 1 as only one oscillator is playing under <i>Osc1</i> and <i>Osc2</i>.
                    Selecting values greater than 1 will decrease the gain of each individual oscillator to offset the increased number of oscillators.
                </p>
                <p>
                    The <i>Voice Detune</i> slider lets the user set the detune of the oscillators.
                    This field is disabled if the number of voices selected is 1.
                    It defines the range of the detune in cents.
                    For example, if <i>Voices</i> is set to 6 and <i>Voice Detune</i> is set to 100, 
                    then the pitch of the oscillators will be evenly distributed -50 cents to +50 cents around the note{"(s)"} being played.
                </p>
            </div>
        </div>
        <div>
            <div className="font-semibold mb-2">ADSR</div>
            <div className="space-y-2">
                <p>
                    The <i>ADSR</i> is an envelope to modulate the volume of the oscillator. 
                    It is located on the left side of the screen below the oscillators.
                </p>
                <p>
                    Clicking the <i>Enable</i> checkbox enables/disables the inputs for the <i>ADSR</i> as well as blackens/greys the <i>ADSR</i> visual.
                    It will also disable the <i>Gain</i> slider for the oscillators. 
                </p>
                <p>
                    The <i>Peak Level</i> slider essentially replaces the <i>Gain</i> slider for the oscillators.
                    The remaining sliders changes the shape of the the <i>ADSR</i> envelope which can be seen through the graph below the sliders.
                </p>
            </div>
        </div>
        <div>
            <div className="font-semibold mb-2">Reverb</div>
            <div className="space-y-2">
                <p>The <i>Reverb</i> module is located to the right of the oscillators.</p>
                <p>Enabling the reverb allows the user to set the <i>Duration</i> in seconds and <i>Decay Factor</i> which defines how quickly the reverb decays.</p>
                <p>The reverb is not affected by the <i>Filter</i>.</p>
            </div>
        </div>
        <div>
            <div className="font-semibold mb-2">Filter</div>
            <div className="space-y-2">
                <p>The <i>Filter</i> module puts a filter on the oscillators and is located to the right of the <i>Reverb</i> module.</p>
                <p>The user can select one of many types of filters along with the target <i>Frequency</i>.</p>
                <p>The user can also adjust the frequency while the oscillators are playing to hear the difference the filter makes.</p>
            </div>
        </div>
        <div className="pb-10">
            <div className="font-semibold mb-2">Audio Graphs</div>
            <div className="space-y-2">
                <p>The <i>Audio Graphs</i> are located below the <i>Piano</i>.</p>
                <p>
                    These graphs show a visual of the sounds being played. 
                    The top graph shows the frequencies being played and the bottom graph is an oscilloscope.

                </p>
            </div>
        </div>
    </div>
    );
}