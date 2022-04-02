class FundamentalsRouter:
    route_app_labels = ['app_fundamentals', 'app_LMS']
    route_app_databs = ['fundamentals_db', 'LMS_db']

    def db(self, applabel):
        return self.route_app_databs[self.route_app_labels.index(applabel)]

    def db_for_read(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return self.db(model._meta.app_label)
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return self.db(model._meta.app_label)
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if (
            obj1._meta.app_label in self.route_app_labels or
            obj2._meta.app_label in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label in self.route_app_labels:
            return db == self.db(app_label)
        return None