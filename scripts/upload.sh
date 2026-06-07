# upload web application
cd dist/application &&
git add . &&
git commit -m "deploy" &&
git push origin main --force

# TODO: Update demo deployment to your own domain
# The original used demo.apexo.app via surge.sh