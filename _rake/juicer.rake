task :juicer do
  sh 'juicer merge --force _site/style/master.css'
  sh 'juicer merge -i --force _site/js/master.js'
end
