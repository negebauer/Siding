# thanks http://deathstartup.com/signing-android-apks-with-circleci/

# use curl to download a keystore from $KEYSTORE_URI, if set,
# to the path/filename set in $KEYSTORE.
if [[ $ANDROID_KEYSTORE_URI && $CIRCLE_WORKING_DIRECTORY ]]
then
  echo "Keystore detected - downloading..."
  # we're using curl instead of wget because it will not
  # expose the sensitive uri in the build logs:
  curl -L -o $CIRCLE_WORKING_DIRECTORY/app/siding.keystore $ANDROID_KEYSTORE_URI
else
  echo "Keystore uri not set.  .APK artifact will not be signed."
fi
