clock: IS_HEROKU=true npm run start-clock
release: IS_HEROKU=true npm run on-release
web: IS_HEROKU=true node --optimize_for_size --max_old_space_size=512 --gc_interval=100 --trace_gc=true --print_cumulative_gc_stat=true index.js
worker: IS_HEROKU=true node --optimize_for_size --max_old_space_size=800 --gc_interval=100 --trace_gc=true --print_cumulative_gc_stat=true worker/jobProcessor.js
