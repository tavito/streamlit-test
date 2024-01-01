import os
import sys
sys.path.insert(0, os.path.abspath('..'))

import streamlit as st
from my_component import my_component

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/example.py`

st.subheader("Component with constant args")

# Create an instance of our component with a constant `name` arg, and
# print its output value.
num_clicks = my_component("World", uploaded_file=None)
st.markdown("You've clicked %s times!" % int(num_clicks))

st.markdown("---")
st.subheader("Component with variable args")

# Create a second instance of our component whose `name` arg will vary
# based on a text_input widget.
#
# We use the special "key" argument to assign a fixed identity to this
# component instance. By default, when a component's arguments change,
# it is considered a new instance and will be re-mounted on the frontend
# and lose its current state. In this case, we want to vary the component's
# "name" argument without having it get recreated.
uploaded_file = st.file_uploader("Choose a file")
name_input = st.text_input("Enter a name", value="Streamlit")

# Assuming uploaded_file is an instance of UploadedFile
if uploaded_file is not None:
    # Read the file content
    file_content = uploaded_file.read()

    # Now pass the file_content instead of the uploaded_file object
    num_clicks = my_component(name_input, file_content, key="foo")
else:
    num_clicks = my_component(name_input, uploaded_file=None, key="foo")
st.markdown("You've clicked %s times!" % int(num_clicks))
